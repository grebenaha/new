const Blacklist = require('../models/blacklist.model');
const async = require('async')

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Show all blacklists.
exports.blacklist_all = function(req, res) {
    Blacklist.find({})
        .exec(function (err, blacklist) {
            if (err) { console.log(err) ; }
            //Successful, so render
            res.render('blacklist_all', { title: 'BlackList', blacklist_list: blacklist });
        });
};

// Show a detailed page for this blacklists.
exports.blacklist_detail = function(req, res) {
    async.parallel({
        blacklist: function(callback) {

            Blacklist.findById(req.params.id)
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.blacklist==null) { // No results.
            const err = new Error('blacklist SMS not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('blacklist_detail', { title: 'Phone number', blacklist: results.blacklist} );
    });
};

// Show blacklists creation form for GET request.
exports.blacklist_add_get = function(req, res) {
    res.render('blacklist_form', { title: 'Add to BlackList'});
};

// Create blacklists POST request.

exports.blacklist_add_post = [

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
            res.render('blacklist_form', { title: 'Add to Blacklist', blacklist: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Blacklist object with escaped and trimmed data.
            let blacklist = new Blacklist(
                {
                    recipient: req.body.recipient,
                });
            blacklist.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(blacklist.url);
            });
        }
    }
];
// Show blacklists removal form for GET request.
exports.blacklist_delete_get = function(req, res) {
    async.parallel({
        blacklist: function(callback) {
            Blacklist.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.blacklist==null) { // No results.
            res.redirect('/smsAdmin/blacklist');
        }
        // Successful, so render.
        res.render('blacklist_delete', { title: 'Delete from BlackList', blacklist: results.blacklist} );
    });
};

// Remove blacklists at POST request.
exports.blacklist_delete_post = function(req, res) {

    async.parallel({
        blacklist: function(callback) {
            Blacklist.findById(req.body.blacklistid).exec(callback)
        },

    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        Blacklist.findByIdAndRemove(req.body.blacklistid, function deleteSMSBlacklist(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/smsAdmin/blacklist')
            })
    });
};

// Show blacklists update form on request GET.
exports.blacklist_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: blacklists update GET');
};

// Update blacklists by POST request.
exports.blacklist_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: blacklists update POST');
};