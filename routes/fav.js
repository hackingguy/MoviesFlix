const express = require('express');
const auth = require('../middlewares/auth');
const addFavController = require('../controllers/fav');
const router = express.Router();

// @GET /favourites
// @POST /add-fav
// @desc Post Request To Add a Favourite

router.get('/favourites',auth,addFavController.getFavourites);
router.post('/add-fav',auth,addFavController.addFavourites);

module.exports = router;