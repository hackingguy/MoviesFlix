var express = require('express');
var router = express.Router();
var {playController} = require("../controllers/play")

// @GET /watch/?id=<Video ID>
// @desc GET request to stream

router.get('/',playController)

module.exports = router;