const {cinema} = require('../../models/movie')
const {getDirectLink} = require('../../utils/getDirectLink')
const sanitizer = require('../../utils/sanitize')
const axios = require("axios")

exports.playController= async(req,res)=>{
    
    let details = await cinema.getMovieDetails(req.query.id);
    let play = details["playing"];
    let id = details['id']
    if(!play["source"]){
        res.send("Sorry This Movie Isn't Available at this Time!!!!!");
        return;
    }
    let link = process.env.CORS_URL + play["source"]["0"];
    try{
        await axios.head(link);
    }
    catch{
        try{
            await axios.head(play["source_bk"]["0"])
            link = process.env.CORS_URL + play["source_bk"]["0"]
        }
        catch{
            let d = await getDirectLink(id,play["movie_source"]);
            link = process.env.CORS_URL +  d["source"]["0"];
        }
    }
    res.render("movie",{
        title: play["title"],
        sourceLink: link,
        episodes:play["source"],
        sideLinks:details["sideLinks"],
        description:play["description"],
        sanitizer:sanitizer
    })
}