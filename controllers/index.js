const Movie = require('../models/movie')
const fs = require('fs')
const util = require('util')
const sanitizer = require('../utils/sanitize')

exports.getMovies = async(req, res) => {
    var pg = req.query.page;
    if(!pg) pg=1;
    let movies = await Movie.getMovies(18,pg);
    let readFile = util.promisify(fs.readFile);
    let top10;
    if(pg==1){
        top10 = await readFile("./public/data.json")
        top10 = JSON.parse(top10);
    }
    else
        top10=false;
    res.render("index",{
        top10:top10,
        movies:movies,
        sanitizer:sanitizer,
        search:false
    });
}