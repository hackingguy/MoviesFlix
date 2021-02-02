const User = require('../models/user');
const bcrypt = require("bcrypt")
const _ = require("lodash");

module.exports.loginGet = async(req,res)=>{
    res.render("login");
}

module.exports.registerGet = async(req,res)=>{
    res.render("register");
}

module.exports.loginPost = async(req,res)=>{
    let {email,password} = req.body;
    let curr = await user.findOne({email:email});
    if(!curr) return res.status(400).send({"error":"Invalid Email Or Password"});
    let isValid = await bcrypt.compare(password,curr.password);
    if(isValid){
        res.send({_id:curr._id});
    }
    else {
        res.status(400).send({"error":"Invalid Email Or Password"});
    }
}


module.exports.registerPost = async(req,res)=>{
    let {name,email,password} = req.body;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pass,salt);
    let user = new User.user(_(req.body).pick(["name","email","password"]))
    let r = await user.save();
    res.send({_id:user._id});
}