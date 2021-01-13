var express = require('express');
var {searchController} = require('../controllers/search')
var router = express.Router();

//@GET /search?q=<Search Query>
//@desc GET request for Searching the Movies

router.get("/",searchController);

module.exports = router;