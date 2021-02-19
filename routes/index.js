var express = require('express');
var auth = require('../middlewares/auth')
var {getMovies} = require('../controllers/index')
var router = express.Router();

// @GET /index
// @desc GET Request To Index Page

router.get("/",auth,getMovies);

module.exports = router;