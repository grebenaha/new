const express = require('express');
const router = express.Router();


const sms_controller = require('../controllers/sms.controller');
const whitelist_controller = require('../controllers/whitelist.controller');


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

/// whitelist ROUTES ///

// GET request for creating whitelist. NOTE This must come before route for id (i.e. display author).

router.get('/whitelist/create', whitelist_controller.whitelist_create_get);

// POST request for creating whitelist.
router.post('/whitelist/create', whitelist_controller.whitelist_create_post);

// GET request to delete whitelist.
router.get('/whitelist/:id/delete', whitelist_controller.whitelist_delete_get);

// POST request to delete whitelist.
router.post('/whitelist/:id/delete', whitelist_controller.whitelist_delete_post);

// GET request to update whitelist.
router.get('/whitelist/:id/update', whitelist_controller.whitelist_update_get);

// POST request to update whitelist.
router.post('/whitelist/:id/update', whitelist_controller.whitelist_update_post);

// GET request for one whitelist.
router.get('/whitelist/:id', whitelist_controller.whitelist_detail);

// GET request for list of all whitelist.
router.get('/whitelist', whitelist_controller.whitelist_all);

module.exports = router;