const {cinema} = require('../../models/movie')
const axios = require("axios")

exports.playController = (req,res)=>{
    cinema.getMovieDetails(req.query.id).then(details=>{
        let play = details["playing"];
            res.render("movie",{
                title: play["title"],
                sourceLink: play["source"]["1"],
                episodes:play["source"],
                sideLinks:details["sideLinks"]
            })
    })
}