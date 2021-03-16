var Movie = require('../models/movie');
var User = require('../models/user');
var sanitizer = require('../utils/sanitize')

var addFav = async(req,res)=>{
    let body = req.body;
    let movieID = body["id"];
    let isValid = Movie.isExists(movieID);
    if(!isValid) return res.status(400).send({"res":"Invalid Movie ID"});
    let favList = await User.addFav(req.userID,movieID);
    res.send({"favList":favList});
}

var getFav = async(req,res)=>{
    let favID = await User.getFavs(req.userID);
    let movies = await Movie.getList(favID);
    res.render('home',({
        top10:false,
        movies:movies,
        sanitizer:sanitizer,
        search:true //On Search True, some things will hide (Pagination,Title Bar)
    }));
}

module.exports.addFavourites = addFav;
module.exports.getFavourites = getFav;