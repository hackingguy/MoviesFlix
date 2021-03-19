const sendMail = require('../utils/sendMail');
const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports.get = async(req,res)=>{
    res.render("reset");
}

module.exports.post = async(req,res)=>{
    let email = req.body["email"];
    let usr = await User.model.findOne({email:email});
    if(!usr) return res.send({"error":"User not registered"});

    let resetToken=crypto.randomBytes(20).toString('hex');
    console.log(resetToken);
    let expiry = Date.now() + 24*60*60*1000;
    usr["passwordResetToken"] = resetToken;
    usr["resetTokenExpiry"] = expiry;
    await usr.save();

    const msg = {
        to: email,
        from: "care@maplehacks.ml",
        subject: `[Moviesflix] Reset Your Password`,
        text: `Hi ${usr.name}`,
        html: `We have received a request to reset your password. Follow this <a href="${process.env.HOST}/reset/token/${resetToken}">link</a>.Please note that this link is only valid for 24 hrs.<br>If you have not requested this, please ignore this mail.<br><br>Regards,<br>MoviesFlix`,
    }
    
    let sent = await sendMail(msg);
    if(!sent) return res.send({"error":"Error while sending mail"});
    res.send({"message":"Mail Sent"});
}

module.exports.resetPassGet = async(req,res)=>{
    let token = req.params.token;
    let user = await User.model.findOne({passwordResetToken:token,resetTokenExpiry:{$gt:Date.now()}});
    if(!user) return res.send({"error":"Token is expired or invalid"});
    res.render("resetPage");
}

module.exports.resetPassPost = async(req,res)=>{
    let token = req.params.token;
    let newPass = req.body["password"];
    if(newPass.length<8 || newPass.length>50) return res.status(400).send({"error":"Invalid Password Length"});
    let user = await User.model.findOne({passwordResetToken:token,resetTokenExpiry:{$gt:Date.now()}});
    if(!user) return res.send({"error":"Token is expired or invalid"});
    let isSame = await bcrypt.compare(newPass,user.password);
    if(isSame) return res.status(400).send({"error":"Old and new passwords cannot be same"});
    user.password = await User.generateHash(newPass);
    user.passwordResetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.send({"message":"Password Changed Successfully"});
}