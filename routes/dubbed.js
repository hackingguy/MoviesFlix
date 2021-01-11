var express = require('express');
var {playController} = require('../controllers/playing/dubbed')
var router = express.Router();


router.get("/",getMovies);

module.exports = router;