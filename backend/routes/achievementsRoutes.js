
const express = require('express');
const router = express.Router();
const achievementsController = require('../controller/achievementsController');
const requireAuth = require('../middleware/requireAuth');



// Route to fetch user achievements based on the selected option

router.get('/', requireAuth, achievementsController.getUserAchievements);

module.exports = router;
