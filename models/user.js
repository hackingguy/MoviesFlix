const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const schema = mongoose.Schema;

const user = new schema({
    // userID:{
    //     type:String,
    //     required:true,
    //     minlength:6,
    //     maxlength:100,
    // },
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:512
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }
})

module.exports.generateToken = (id)=>{
    return jwt.sign({_id:id},process.env.JWT_SECRET_TOKEN);
}

module.exports.user = mongoose.model("users",user);