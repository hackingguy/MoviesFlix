var Movie = require('../models/movie');
var User = require('../models/user');
var sanitizer = require('../utils/sanitize')

var addFav = async(req,res)=>{
    let body = req.body;
    let movieID = body["id"];
    let isValid = Movie.isExists(movieID);
    if(!isValid) return res.status(400).send({"res":"Invalid Movie ID"});
    let usrID = req.userID;
    let usr = await User.findOne({_id:usrID});
    usr.fav.push(movieID);
    await usr.save();
    res.send({"res":"Added Successfully"});
}

var getFav = async(req,res)=>{
    let uid = req.userID;
    let usr = await User.findOne({_id:uid});
    let movies = await Movie.model.find({ _id: { $in: usr['fav'] }});
    res.render('index',({
        top10:false,
        movies:movies,
        sanitizer:sanitizer,
        search:true //On Search True, some things will hide (Pagination,Title Bar)
    }));
}

module.exports.addFavourites = addFav;
module.exports.getFavourites = getFav;