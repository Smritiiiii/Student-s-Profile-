// adminRoutes.js
const express = require('express');
const adminController = require('../controller/adminController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Admin login request
router.post('/login', adminController.login);

// Get admin user information
router.get('/admin', requireAuth, adminController.getAdminInfo);

// Generate login credentials for a new student
router.post('/generateCredentials',adminController.generateCredentials);

// Change password for a student on first login
router.post('/changePassword',  adminController.changePassword);

module.exports = router;
