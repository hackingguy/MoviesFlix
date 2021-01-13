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
    let link = play["source"]["0"];
    try{
        await axios.head(link);
    }
    catch{
        try{
            await axios.head(play["source_bk"]["0"])
            link = play["source_bk"]["0"]
        }
        catch{
            let d = await getDirectLink(play["movie_source"]);
            link = d["source"]["0"];
        }
    }
    res.render("movie",{
        title: play["title"],
        sourceLink: link,
        episodes:play["source"],
        sideLinks:details["sideLinks"],
    })
}