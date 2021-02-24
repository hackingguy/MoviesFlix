const router = require('express').Router();
const auth = require('../middlewares/auth')
const authController = require('../controllers/auth')

// @GET /login
// @POST /login
// @GET /register
// @POST /register
// @desc Creating And Logging In The User

router.get('/login',auth,authController.loginGet);
router.post('/login',authController.loginPost);
router.get('/register',auth,authController.registerGet);
router.post('/register',authController.registerPost);
router.get('/logout',authController.logout);
module.exports = router;