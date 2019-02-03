const Sms = require('../models/sms.model');
const Whitelist = require('../models/whitelist.model');
const Blacklist = require('../models/blacklist.model');
const Hourly = require('../models/hourly.model');
const Daily = require('../models/daily.model');

const paginate = require('express-paginate');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async');

exports.index = function(req, res) {
    async.parallel({
        sms_count: function(callback) {
            Sms.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        whitelist_count: function(callback) {
            Whitelist.countDocuments({}, callback);
        },
        blacklist_count: function (callback) {
            Blacklist.countDocuments({}, callback)
        },
        hourly_count: function (callback) {
            Hourly.countDocuments({}, callback)
        },
        daily_count: function (callback) {
            Daily.countDocuments({}, callback)
        }
    }, function(err, results) {
        res.render('index', { title: 'SMS Admin Panel', error: err, data: results });
    });
};

// Show all sms.
exports.sms_all = async function(req, res) {
    try {
        const [ results, itemCount ] = await Promise.all([
            Sms.find({}).limit(req.query.limit).skip(req.skip).exec(),
            Sms.count({}).lean()
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
            res.render('sms_all', {
                title: 'SMS List',
                sms_list: results,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
            });

    } catch (err) {
        next(err);
    }
    // Sms.find({})
    //     .exec(function (err, list_sms) {
    //         if (err) { console.log(err) ; }
    //         //Successful, so render
    //         res.render('sms_all', { title: 'SMS List', sms_list: list_sms });
    //     });
};

// Show a detailed page for this sms.
exports.sms_detail = function(req, res) {
    async.parallel({
        sms: function(callback) {
            Sms.findById(req.params.id)
                .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.sms==null) { // No results.
            const err = new Error('SMS not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('sms_detail', { title: 'SMS List', sms: results.sms} );
    });
};

// Show sms creation form for GET request.
exports.sms_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms create GET');
};

// Create sms POST request.
exports.sms_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Sms create POST');
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