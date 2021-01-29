const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api')

router.get('/latest/:skip/:num',apiController.latest);
router.get('/movie/',apiController.movie);
router.get('/search/',apiController.search);

module.exports = router;