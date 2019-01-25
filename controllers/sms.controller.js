const Sms = require('../models/sms.model');
const Whitelists = require('../models/whitelists.model');

const async = require('async');

exports.index = function(req, res) {
    async.parallel({
        sms_count: function(callback) {
            Sms.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        whitelists_count: function(callback) {
            Whitelists.countDocuments({}, callback);
        },
        // book_instance_available_count: function(callback) {
        //     BookInstance.countDocuments({status:'Available'}, callback);
        // },
        // author_count: function(callback) {
        //     Author.countDocuments({}, callback);
        // },
        // genre_count: function(callback) {
        //     Genre.countDocuments({}, callback);
        // }
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
    res.send('NOT IMPLEMENTED: Sms detail: ' + req.params.id);
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