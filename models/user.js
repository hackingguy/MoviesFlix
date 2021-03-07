const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
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

class User {
    constructor(document) {
        this.document = document;
        this.model = mongoose.model(document, userSchema);
    }

    async getFavs(id){
        let uid = id;
        let usr = await this.model.findOne({_id:uid});
        return usr['fav'];
    }

    async addFav(id,movieID){
        let usrID = id;
        let usr = await this.model.findOne({_id:usrID});
        if(usr.fav.indexOf(movieID)!=-1){
            usr.fav = usr.fav.filter(i => i !== movieID);
        }
        else{
            usr.fav.push(movieID);
        }
        await usr.save();
    }
}

module.exports = new User('users');