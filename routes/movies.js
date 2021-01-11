var express = require('express');
var router = express.Router();
var {playController} = require("../controllers/playing/vidnext")

router.get('/',playController)

module.exports = router;