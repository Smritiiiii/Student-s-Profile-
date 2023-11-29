const express = require('express');
const router = express.Router();
const admininfoController = require('../controller/admininfoContoller');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/upload')




// Define the POST route for uploading user photo
router.post('/uploadAdminPhoto', [upload.single('adminPhoto'), requireAuth], admininfoController.uploadAdminPhoto);

// Define the GET route for fetching user info
router.get('/', requireAuth, admininfoController.getAdminInfo);

module.exports = router;




