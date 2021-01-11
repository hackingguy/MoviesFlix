const {cinema} = require('../../models/movie')
const {getDirectLink} = require('../../utils/getDirectLink')
const axios = require("axios")

exports.playController= (req,res)=>{
    cinema.getMovieDetails(req.query.id).then(details=>{
        let play = details["playing"];
        let link = play["source"]["1"];
        axios.head(link)
        .then(()=>{
            res.render("movie",{
                title: play["title"],
                sourceLink: play["source"]["1"],
                episodes:play["source"],
                sideLinks:details["sideLinks"],
            })
        })
        .catch(()=>{
            getDirectLink(play["movie_link"])
                .then(d=>{
                    s = d;
                    res.render("movie",{
                        title: play["title"],
                        sourceLink: s["source"]["1"],
                        episodes:play["source"],
                        sideLinks:details["sideLinks"],
                    })
                })
        })
        
    })
}