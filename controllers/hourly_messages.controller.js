const Hourly = require('../models/hourly.model');
const async = require('async')

const paginate = require('express-paginate');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Show all hourlys.
exports.hourly_messages_all = async function(req, res) {
    try {
        const [ results, itemCount ] = await Promise.all([
            Hourly.find({}).limit(req.query.limit).skip(req.skip).exec(),
            Hourly.count({}).lean()
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
        res.render('hourly_all', {
            title: 'Hourly messages',
            hourly_list: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
        });
    } catch (err) {
        next(err);
    }
};

// Show a detailed page for this hourly.
exports.hourly_messages_detail = function(req, res) {
    async.parallel({
        hourly: function(callback) {

            Hourly.findById(req.params.id)
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.hourly==null) { // No results.
            const err = new Error('hourly SMS not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('hourly_detail', { title: 'Hourly messages', hourly: results.hourly} );
    });
};

// Show hourlys creation form for GET request.
exports.hourly_messages_add_get = function(req, res) {
    res.render('hourly_form', { title: 'Hourly messages'});
};

// Create hourlys POST request.

exports.hourly_messages_add_post = [

    // Validate fields.
    body('recipient').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
    // .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('recipient').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('hourly_form', { title: 'Hourly messages', hourly: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an hourly object with escaped and trimmed data.
            let hourly = new Hourly(
                {
                    recipient: req.body.recipient,
                });
            hourly.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(hourly.url);
            });
        }
    }
];
// Show hourlys removal form for GET request.
exports.hourly_messages_delete_get = function(req, res) {
    async.parallel({
        hourly: function(callback) {
            Hourly.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.hourly==null) { // No results.
            res.redirect('/smsAdmin/hourly');
        }
        // Successful, so render.
        res.render('hourly_delete', { title: 'Hourly messages', hourly: results.hourly} );
    });
};

// Remove hourlys at POST request.
exports.hourly_messages_delete_post = function(req, res) {

    async.parallel({
        hourly: function(callback) {
            Hourly.findById(req.body.hourlyid).exec(callback)
        },

    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        Hourly.findByIdAndRemove(req.body.hourlyid, function deleteSMShourly(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.redirect('/smsAdmin/hourly_messages')
        })
    });
};

// Show hourlys update form on request GET.
exports.hourly_messages_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: hourlys update GET');
};

// Update hourlys by POST request.
exports.hourly_messages_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: hourlys update POST');
};