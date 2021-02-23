var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');
var auth = require('../middlewares/auth')

router.get('/',auth,indexController.index);

module.exports = router;