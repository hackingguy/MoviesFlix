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
    let curr = await User.user.findOne({email:email});
    if(!curr) return res.status(400).send({"error":"Invalid Email Or Password"});
    let isValid = await bcrypt.compare(password,curr.password);
    if(isValid){
        res.headers["Authorization"]="Bearer "+User.generateToken(curr._id);
        res.send({_id:curr._id});
    }
    else 
        res.status(400).send({"error":"Invalid Email Or Password"});
}

module.exports.registerPost = async(req,res)=>{
    let usr = _.pick(req.body,["name","email","password"]);
    let salt = await bcrypt.genSalt(10);
    usr.password = await bcrypt.hash(usr.password,salt);
    let a = User.user.findOne({email:usr.email});
    if(a) return res.status(400).send({"error":"User Already Registered"});
    let user = new User.user(usr);
    let r = await user.save();
    res.headers["Authorization"]="Bearer "+User.generateToken(curr._id);
    res.send({_id:r._id});
}