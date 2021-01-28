var express = require('express');
var {playController} = require('../controllers/playing/dubbed')
var router = express.Router();


router.get("/",getMovies);
router.get('/',(req,res)=>{

})

module.exports = router;