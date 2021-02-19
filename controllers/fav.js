var Movie = require('../models/movie')
var User = require('../models/user')

var addFav = async(req,res)=>{
    let body = req.body;
    let movieID = JSON.parse(body)["id"];
    let isValid = Movie.cinema.isExists(movieID);
    if(!isValid) return res.status(400).send({"res":"Invalid Movie ID"});
    let usrID = req.userID;
    let usr = await User.findOne({_id:usrID});
    usr.fav.push(movieID);
    await usr.save();
    res.send({"res":"Added Successfully"});
}

module.exports = addFav;