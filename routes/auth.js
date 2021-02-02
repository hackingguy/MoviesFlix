const { router } = require('express');
const authController = require('../controllers/auth')

router.get('/login',authController.loginGet);
router.post('/login',authController.loginPost);
router.get('/register',authController.registerGet);
router.post('/register',authController.registerPost);

module.exports = router;