const express = require('express');
const router = express.Router();


const sms_controller = require('../controllers/sms.controller');
const whitelists_controller = require('../controllers/whitelists.controller');


/// SMS ROUTES ///

// GET sms home page.
router.get('/', sms_controller.index);

// GET request for creating a SMS. NOTE This must come before routes that display SMS (uses id).

router.get('/sms/create', sms_controller.sms_create_get);

// POST request for creating SMS.
router.post('/sms/create', sms_controller.sms_create_post);

// GET request to delete SMS.
router.get('/sms/:id/delete', sms_controller.sms_delete_get);

// POST request to delete SMS.
router.post('/sms/:id/delete', sms_controller.sms_delete_post);

// GET request to update SMS.
router.get('/sms/:id/update', sms_controller.sms_update_get);

// POST request to update SMS.
router.post('/sms/:id/update', sms_controller.sms_update_post);

// GET request for one SMS.
router.get('/sms/:id', sms_controller.sms_detail);

// GET request for list of all SMS items.
router.get('/allsms', sms_controller.sms_all);

/// whitelists ROUTES ///

// GET request for creating whitelists. NOTE This must come before route for id (i.e. display author).

router.get('/whitelists/create', whitelists_controller.whitelists_create_get);

// POST request for creating whitelists.
router.post('/whitelists/create', whitelists_controller.whitelists_create_post);

// GET request to delete whitelists.
router.get('/whitelists/:id/delete', whitelists_controller.whitelists_delete_get);

// POST request to delete whitelists.
router.post('/whitelists/:id/delete', whitelists_controller.whitelists_delete_post);

// GET request to update whitelists.
router.get('/whitelists/:id/update', whitelists_controller.whitelists_update_get);

// POST request to update whitelists.
router.post('/whitelists/:id/update', whitelists_controller.whitelists_update_post);

// GET request for one whitelists.
router.get('/whitelists/:id', whitelists_controller.whitelists_detail);

// GET request for list of all whitelists.
router.get('/whitelists', whitelists_controller.whitelists_all);

module.exports = router;