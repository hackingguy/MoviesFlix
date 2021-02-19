const router = require('express').Router();
const authController = require('../controllers/auth')

// @GET /login
// @POST /login
// @GET /register
// @POST /register
// @desc Creating And Logging In The User

router.get('/login',authController.loginGet);
router.post('/login',authController.loginPost);
router.get('/register',authController.registerGet);
router.post('/register',authController.registerPost);

module.exports = router;