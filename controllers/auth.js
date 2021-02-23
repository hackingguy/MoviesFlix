const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

function generateToken(id,exp) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN,{
    expiresIn:exp //Soon Implementing refresh token authentication
  });
}

module.exports.loginGet = async (req, res) => {
  if (req.userID) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
};

module.exports.registerGet = async (req, res) => {
  if (req.userID) {
    res.redirect("/home");
  } else {
    res.render("register");
  }
};

module.exports.loginPost = async (req, res) => {
  let { email, password } = req.body;
  let curr = await User.findOne({ email: email });
  if (!curr)
    return res.status(400).send({ error: "Invalid Email Or Password" });
  let isValid = await bcrypt.compare(password, curr.password);
  if (isValid) {
    let token = generateToken(curr._id,'24h');
    res.setHeader("Authorization", "Bearer " + token);
    res.send({ _id: curr._id, name: curr.name, Token: token });
  } else res.status(400).send({ error: "Invalid Email Or Password" });
};

module.exports.registerPost = async (req, res) => {
  let usr = _.pick(req.body, ["name", "email", "password"]);
  let a = await User.findOne({ email: usr.email }).exec();
  if (a) return res.status(400).send({ error: "User Already Registered" });
  let salt = await bcrypt.genSalt(10);
  usr.password = await bcrypt.hash(usr.password, salt);
  let user = new User(usr);
  let r = await user.save();
  res.setHeader("Authorization", "Bearer " + generateToken(usr._id));
  res.send({ _id: r._id });
};

module.exports.logout = async(req,res) => {
  res.redirect('/login');
}