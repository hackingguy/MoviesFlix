var express = require('express');
var {getMovies} = require('../controllers/index')
var router = express.Router();

// @GET /index
// @desc GET Request To Index Page

router.get("/",getMovies);

module.exports = router;