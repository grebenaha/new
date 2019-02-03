const Whitelist = require('../models/whitelist.model');
const async = require('async')

const paginate = require('express-paginate');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Show all whitelists.
exports.whitelist_all = async function(req, res) {
    try {
        const [ results, itemCount ] = await Promise.all([
            Whitelist.find({}).limit(req.query.limit).skip(req.skip).exec(),
            Whitelist.count({}).lean()
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
        res.render('whitelist_all', {
            title: 'Whitelist messages',
            whitelist_list: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
        });
    } catch (err) {
        next(err);
    }
};

// Show a detailed page for this whitelists.
exports.whitelist_detail = function(req, res) {
    async.parallel({
        whitelist: function(callback) {

            Whitelist.findById(req.params.id)
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return (err); }
        if (results.whitelist==null) { // No results.
            const err = new Error('Whitelist SMS not found');
            err.status = 404;
            return (err);
        }
        // Successful, so render.
        res.render('whitelist_detail', { title: 'WhiteList', whitelist: results.whitelist} );
    });
};

// Show whitelists creation form for GET request.
exports.whitelist_add_get = function(req, res) {
    res.render('whitelist_form', { title: 'Add to Whitelist'});
};

// Create whitelists POST request.
exports.whitelist_add_post = [

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
            res.render('whitelist_form', { title: 'Add to Whitelist', whitelist: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Whitelist object with escaped and trimmed data.
            let whitelist = new Whitelist(
                {
                    recipient: req.body.recipient,
                });
            whitelist.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(whitelist.url);
            });
        }
    }
];

// Show whitelists removal form for GET request.
exports.whitelist_delete_get = function(req, res) {
    async.parallel({
        whitelist: function(callback) {
            Whitelist.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.whitelist==null) { // No results.
            res.redirect('/smsAdmin/whitelist');
        }
        // Successful, so render.
        res.render('whitelist_delete', { title: 'Delete from Whitelist', whitelist: results.whitelist} );
    });
};

// Remove whitelists at POST request.
exports.whitelist_delete_post = function(req, res) {
    async.parallel({
        whitelist: function(callback) {
            Whitelist.findById(req.body.whitelistid).exec(callback)
        },

    }, function(err, results) {
        if (err) { return (err); }
        // Success
        Whitelist.findByIdAndRemove(req.body.whitelistid, function deleteSMSWhitelist(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.redirect('/smsAdmin/whitelist')
        })
    });
};

// Show Whitelist update form on request GET.
exports.whitelist_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update GET');
};

// Update Whitelist by POST request.
exports.whitelist_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update POST');
};