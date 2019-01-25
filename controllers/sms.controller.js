const Sms = require('../models/sms.model');
const Whitelists = require('../models/whitelists.model');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const async = require('async');

exports.index = function(req, res) {
    async.parallel({
        sms_count: function(callback) {
            Sms.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        whitelists_count: function(callback) {
            Whitelists.countDocuments({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'SMS Admin Panel', error: err, data: results });
    });
};

// Show all sms.
exports.sms_all = function(req, res) {
    Sms.find({})
        //.populate('content')
        .exec(function (err, list_sms) {
            if (err) { console.log(err) ; }
            //Successful, so render
            res.render('sms_all', { title: 'SMS List', sms_list: list_sms });
        });
};

// Show a detailed page for this sms.
exports.sms_detail = function(req, res) {
    async.parallel({
        sms: function(callback) {

            Sms.findById(req.params.id)
                // .populate('author')
                // .populate('genre')
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.sms==null) { // No results.
            const err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('sms_detail', { title: 'Recipient', sms: results.sms} );
    });
};

// Show sms creation form for GET request.
exports.sms_create_get = function(req, res) {
    res.render('sms_form', { title: 'Create SMS'});
};

// Create sms POST request.
exports.sms_create_post = function(req, res) {
    // Validate fields.
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(author.url);
            });
        }
    }
};

// Show sms removal form for GET request.
exports.sms_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms delete GET');
};

// Remove sms at POST request.
exports.sms_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms delete POST');
};

// Show sms update form on request GET.
exports.sms_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms update GET');
};

// Update sms by POST request.
exports.sms_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms update POST');
};