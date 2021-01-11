const {cinema} = require('../models/movie')

exports.getMovies = (req, res) => {
    var pg = req.query.page;
    if(!pg) pg=1;
    cinema.getMovies(14,pg).then(movies=>{
        res.render("index",{
            movies:movies
        });
    })
}