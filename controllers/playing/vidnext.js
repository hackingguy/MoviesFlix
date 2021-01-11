const {cinema} = require('../../models/movie')
const {getDirectLink} = require('../../utils/getDirectLink')
const axios = require("axios")

exports.playController= async(req,res)=>{
    let details = await cinema.getMovieDetails(req.query.id);
    let play = details["playing"];
    if(!play["source"]){
        res.send("Sorry This Movie Isn't Available at this Time!!!!!");
        return;
    }
    let link = play["source"]["1"];
    try{
        await axios.head(link);
    }
    catch{
        let d = await getDirectLink(play["movie_link"]);
        play["source"] = d["source"];
    }
    res.render("movie",{
        title: play["title"],
        sourceLink: play["source"]["1"],
        episodes:play["source"],
        sideLinks:details["sideLinks"],
    })
}