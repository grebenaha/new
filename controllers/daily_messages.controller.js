const Daily = require('../models/daily.model');
const async = require('async')

const paginate = require('express-paginate')

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Show all daily.
exports.daily_messages_all = async function(req, res) {
    try {
        const [ results, itemCount ] = await Promise.all([
            Daily.find({}).limit(req.query.limit).skip(req.skip).exec(),
            Daily.count({}).lean()
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
        res.render('daily_all', {
            title: 'Daily messages',
            daily_list: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
        });
    } catch (err) {
        next(err);
    }
};

// Show a detailed page for this dailys.
exports.daily_messages_detail = function(req, res) {
    async.parallel({
        daily: function(callback) {

            Daily.findById(req.params.id)
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.daily==null) { // No results.
            const err = new Error('daily SMS not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('daily_detail', { title: 'Daily messages', daily: results.daily} );
    });
};

// Show dailys creation form for GET request.
exports.daily_messages_add_get = function(req, res) {
    res.render('daily_form', { title: 'Daily messages'});
};

// Create dailys POST request.

exports.daily_messages_add_post = [

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
            res.render('daily_form', { title: 'Daily messages', daily: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an daily object with escaped and trimmed data.
            let daily = new Daily(
                {
                    recipient: req.body.recipient,
                });
            daily.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(daily.url);
            });
        }
    }
];
// Show dailys removal form for GET request.
exports.daily_messages_delete_get = function(req, res) {
    async.parallel({
        daily: function(callback) {
            Daily.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.daily==null) { // No results.
            res.redirect('/smsAdmin/daily_messages');
        }
        // Successful, so render.
        res.render('daily_delete', { title: 'Daily messages', daily: results.daily} );
    });
};

// Remove dailys at POST request.
exports.daily_messages_delete_post = function(req, res) {

    async.parallel({
        daily: function(callback) {
            Daily.findById(req.body.dailyid).exec(callback)
        },

    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        Daily.findByIdAndRemove(req.body.dailyid, function deleteSMSdaily(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.redirect('/smsAdmin/daily_messages')
        })
    });
};

// Show dailys update form on request GET.
exports.daily_messages_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: dailys update GET');
};

// Update dailys by POST request.
exports.daily_messages_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: dailys update POST');
};