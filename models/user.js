const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
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
    },
    fav: [{
        type:String
    }]
})

module.exports = mongoose.model("users",user);