const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api')

// @GET /api
// @GET /api/latest/:skip/:num
// @GET /api/movie/
// @GET /api/search/
// @desc GET Request To API Page

router.get('/',apiController.home)
router.get('/latest/:skip/:num',apiController.latest);
router.get('/movie/',apiController.movie);
router.get('/search/',apiController.search);

module.exports = router;