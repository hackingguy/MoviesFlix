const router = require('express').Router();
const resetController = require('../controllers/reset');

router.get("/",resetController.get);
router.post("/",resetController.post);
router.get("/token/:token",resetController.resetPassGet);
router.post("/token/:token",resetController.resetPassPost);

module.exports = router;