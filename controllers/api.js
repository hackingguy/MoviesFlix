const cinema = require("../models/movie")

module.exports.latest = async(req,res)=>{
    let num = parseInt(req.params.num);
    let skip = parseInt(req.params.skip);
    if(num>10) num=10;
    let data = await cinema.getMovies(num,skip)
    res.send(data);
}

module.exports.movie = async(req,res)=>{
    let id = req.query.id;
    if(!id) res.send({"Error":"title param required"});
    let data = await cinema.getMovieDetails(id);
    res.send(data);
}

module.exports.search = async(req,res)=>{
    let title=req.query.title;
    if(!title) res.send({"Error":"title param required"});
    let data = await cinema.search(title);
    res.send(data);
}