var express = require('express');
var auth = require('../middlewares/auth')
var addFav = require('../controllers/fav')
var router = express.Router();

// @POST /add-fav
// @desc Post Request To Add a Favourite

router.post('/',auth,addFav);

module.exports = router;