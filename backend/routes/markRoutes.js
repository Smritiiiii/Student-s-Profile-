
const express = require('express')

const markContoller = require('../controller/markController')
const requireAuth = require ('../middleware/requireAuth');

const router = express.Router();

router.get('/' , requireAuth , markContoller.getMarkData);

module.exports = router;