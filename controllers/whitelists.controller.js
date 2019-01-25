const Whitelists = require('../models/whitelists.model');

// Show all whitelists.
exports.whitelists_all = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists');
};

// Show a detailed page for this whitelists.
exports.whitelists_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists detail: ' + req.params.id);
};

// Show whitelists creation form for GET request.
exports.whitelists_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists create GET');
};

// Create whitelists POST request.
exports.whitelists_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists create POST');
};

// Show whitelists removal form for GET request.
exports.whitelists_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists delete GET');
};

// Remove whitelists at POST request.
exports.whitelists_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists delete POST');
};

// Show sms update form on request GET.
exports.whitelists_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update GET');
};

// Update author by POST request.
exports.whitelists_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: whitelists update POST');
};