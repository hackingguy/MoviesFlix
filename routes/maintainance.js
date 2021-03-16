var express = require('express');
var router = express.Router();

// @GET /edit-profile
// @desc GET Request To Edit Profile Page

router.get("/",async(req,res)=>{
    res.render('maintainance');
})

module.exports = router;