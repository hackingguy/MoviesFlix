const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const _ = require("lodash");


function customErrors(name,limit){
  return {
    'any.base': `${name} is invalid`,
    'any.empty': `${name} cannot be empty`,
    'any.min': `${name} must have ${limit} characters`,
    'any.invalid:': `${name} is invalid`,
    'any.required': `${name} is required`
  }
}

const validateLogin = Joi.object({
  email:Joi.string().email().min(5).max(40).required().messages(customErrors("Email",5)),
  password:Joi.string().min(6).max(50).required().messages(customErrors("Password",8))
});

const validateRegister = Joi.object({
  name:Joi.string().min(3).max(30).required().messages(customErrors("Name",3)),
  email:Joi.string().email().min(5).max(40).required().messages(customErrors("Email",5)),
  password:Joi.string().min(6).max(50).required().messages(customErrors("Password",8))
});

function generateToken(id,exp) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN,{
    expiresIn:exp //Soon Implementing refresh token
  });
}

module.exports.loginGet = async (req, res) => {
  if (req.userID) 
    return res.redirect("/home");
  res.render("login");
};

module.exports.registerGet = async (req, res) => {
  if (req.userID)
    return res.redirect("/home");
  
  res.render("register");
};

module.exports.loginPost = async (req, res) => {
  if(req.userID) return res.send({"error":"You Need To Log Out!"});
  let { email, password } = req.body;
  let value = validateLogin.validate(req.body);
  if(value.error)
    return res.send({error:value.error.details[0].message});
  let user = await User.model.findOne({ email: email });
  if (!user)
    return res.status(400).send({ error: "Invalid Email Or Password" });
  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    let token = generateToken(user._id,'24h');
    res.cookie("token",token,{
      expires:new Date(Date.now()+1000*60*60*24),
      httpOnly:true
    });
    return res.send({ _id: user._id, name: user.name, fav: user.fav });
  }
  res.status(400).send({ error: "Invalid Email Or Password" });
};

module.exports.registerPost = async (req, res) => {
  if(req.userID) return res.send({"error":"You Need To Log Out!"});
  let usr = _.pick(req.body, ["name", "email", "password"]);
  let value = validateRegister.validate(usr);
  if(value.error)
      return res.send({error:value.error.details[0].message});
  let a = await User.model.findOne({ email: usr.email });
  if (a) return res.status(400).send({ "error": "User Already Registered" });
  usr.password = await User.generateHash(usr.password);
  let user = new User.model(usr);
  let r = await user.save();
  res.send({ _id: r._id });
};

module.exports.logout = async(req,res) => {
  if(req.userID){
    let expToken = generateToken(req.userID,1);
    res.cookie("token",expToken,{
      expires:new Date(Date.now()+1),
      httpOnly:true
    })
    return res.redirect('/login');
  }
  res.redirect('/login');
}