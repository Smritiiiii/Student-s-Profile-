const express = require('express');
const usercontoller= require('../controller/usercontroller');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

 
//login request
router.post('/login', usercontoller.login)

//get user information
router.get('/user', requireAuth, usercontoller.getUserInfo)

module.exports = router 