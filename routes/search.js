var express = require('express');
var {searchController} = require('../controllers/search')
var router = express.Router();

router.get("/",searchController);

module.exports = router;