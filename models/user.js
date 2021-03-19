const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    fav: [{
        type:String
    }],
    passwordResetToken:{
        type:String
    },
    resetTokenExpiry:{
        type:Date
    }
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
        let favList = usr["fav"]
        await usr.save();
        return favList;
    }


    async generateHash(pass){
        let salt = await bcrypt.genSalt(10);
        pass = await bcrypt.hash(pass, salt);
        return pass;
    }
}

module.exports = new User('users');