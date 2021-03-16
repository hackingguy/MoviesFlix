var express = require('express');
var router = express.Router();

// @GET /edit-profile
// @desc GET Request To Edit Profile Page

router.get("/",(req,res)=>{
    res.redirect("/maintainance");
})

module.exports = router;