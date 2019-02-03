const express = require('express');
const router = express.Router();


const sms_controller = require('../controllers/sms.controller');
const whitelist_controller = require('../controllers/whitelist.controller');
const blacklist_controller = require('../controllers/blacklist.controller');
const hourly_messages_controller = require('../controllers/hourly_messages.controller');
const daily_messages_controller = require('../controllers/daily_messages.controller');

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

// GET request for creating whitelist. NOTE This must come before route for id (i.e. display ).

router.get('/whitelist/add', whitelist_controller.whitelist_add_get);

// POST request for creating whitelist.
router.post('/whitelist/add', whitelist_controller.whitelist_add_post);

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


/// BlackList ROUTES ///

// GET request for creating blacklist. NOTE This must come before route for id (i.e. display ).

router.get('/blacklist/add', blacklist_controller.blacklist_add_get);

// POST request for creating blacklist.
router.post('/blacklist/add', blacklist_controller.blacklist_add_post);

// GET request to delete blacklist.
router.get('/blacklist/:id/delete', blacklist_controller.blacklist_delete_get);

// POST request to delete blacklist.
router.post('/blacklist/:id/delete', blacklist_controller.blacklist_delete_post);

// GET request to update blacklist.
router.get('/blacklist/:id/update', blacklist_controller.blacklist_update_get);

// POST request to update blacklist.
router.post('/blacklist/:id/update', blacklist_controller.blacklist_update_post);

// GET request for one blacklist.
router.get('/blacklist/:id', blacklist_controller.blacklist_detail);

// GET request for list of all blacklist.
router.get('/blacklist', blacklist_controller.blacklist_all);

/// hourly_messages ROUTES ///

// GET request for creating hourly_messages. NOTE This must come before route for id (i.e. display ).

router.get('/hourly_messages/add', hourly_messages_controller.hourly_messages_add_get);

// POST request for creating hourly_messages.
router.post('/hourly_messages/add', hourly_messages_controller.hourly_messages_add_post);

// GET request to delete hourly_messages.
router.get('/hourly_messages/:id/delete', hourly_messages_controller.hourly_messages_delete_get);

// POST request to delete hourly_messages.
router.post('/hourly_messages/:id/delete', hourly_messages_controller.hourly_messages_delete_post);

// GET request to update hourly_messages.
router.get('/hourly_messages/:id/update', hourly_messages_controller.hourly_messages_update_get);

// POST request to update hourly_messages.
router.post('/hourly_messages/:id/update', hourly_messages_controller.hourly_messages_update_post);

// GET request for one hourly_messages.
router.get('/hourly_messages/:id', hourly_messages_controller.hourly_messages_detail);

// GET request for list of all hourly_messages.
router.get('/hourly_messages', hourly_messages_controller.hourly_messages_all);

/// daily_messages ROUTES ///

// GET request for creating daily_messages. NOTE This must come before route for id (i.e. display ).

router.get('/daily_messages/add', daily_messages_controller.daily_messages_add_get);

// POST request for creating daily_messages.
router.post('/daily_messages/add', daily_messages_controller.daily_messages_add_post);

// GET request to delete daily_messages.
router.get('/daily_messages/:id/delete', daily_messages_controller.daily_messages_delete_get);

// POST request to delete daily_messages.
router.post('/daily_messages/:id/delete', daily_messages_controller.daily_messages_delete_post);

// GET request to update daily_messages.
router.get('/daily_messages/:id/update', daily_messages_controller.daily_messages_update_get);

// POST request to update daily_messages.
router.post('/daily_messages/:id/update', daily_messages_controller.daily_messages_update_post);

// GET request for one daily_messages.
router.get('/daily_messages/:id', daily_messages_controller.daily_messages_detail);

// GET request for list of all daily_messages.
router.get('/daily_messages', daily_messages_controller.daily_messages_all);


module.exports = router;