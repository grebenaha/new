const Whitelist = require('../models/whitelist.model');

// Show all whitelists.
exports.whitelist_all = function(req, res) {
    Whitelist.find({})
        .exec(function (err, whitelist) {
            if (err) { console.log(err) ; }
            //Successful, so render
            res.render('whitelist_all', { title: 'Whitelist', whitelist_list: whitelist });
        });
};

// Show a detailed page for this whitelists.
exports.whitelist_detail = function(req, res) {
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
        res.render('sms_detail', { title: 'Recipient', sms: results.sms} );
    });
};

// Show whitelists creation form for GET request.
exports.whitelist_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists create GET');
};

// Create whitelists POST request.
exports.whitelist_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists create POST');
};

// Show whitelists removal form for GET request.
exports.whitelist_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists delete GET');
};

// Remove whitelists at POST request.
exports.whitelist_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists delete POST');
};

// Show sms update form on request GET.
exports.whitelist_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update GET');
};

// Update author by POST request.
exports.whitelist_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update POST');
};