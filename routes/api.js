const express = require('express')
const router = express.Router();
const {apiController} = require('../controllers/api')

router.get('/:accessToken/',apiController);

module.exports = router;