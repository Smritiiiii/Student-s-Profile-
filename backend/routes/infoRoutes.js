const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoContoller');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/upload')




// Define the POST route for uploading user photo
router.post('/uploadUserPhoto', [upload.single('photo'), requireAuth], infoController.uploadUserPhoto);

// Define the GET route for fetching user info
router.get('/', requireAuth, infoController.getUserInfo);

module.exports = router;




