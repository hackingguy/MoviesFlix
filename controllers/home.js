const Movie = require('../models/movie')
const fs = require('fs')
const util = require('util')
const sanitizer = require('../utils/sanitize')

exports.getMovies = async(req, res) => {
    if(!req.userID) return res.status(400).redirect('/login');
    var pg = req.query.page;
    let sz=27;
    if(!pg || pg==1){
        pg=1;
        sz=18;
    }
    let movies = await Movie.getMovies(sz,pg);
    let readFile = util.promisify(fs.readFile);
    let top10;
    if(pg==1){
        top10 = await readFile("./public/data.json")
        top10 = JSON.parse(top10);
    }
    else
        top10=false;
    res.render("home",{
        top10:top10,
        movies:movies,
        sanitizer:sanitizer,
        search:false
    });
}