const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    userID:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100,
    },
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

module.exports.user = mongoose.model("users",user);