var express = require('express');
var {getMovies} = require('../controllers/movies')
var router = express.Router();


router.get("/",getMovies);

module.exports = router;