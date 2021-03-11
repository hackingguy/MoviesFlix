const Movie = require('../models/movie')
const {getDirectLink} = require('../utils/getDirectLink')
const sanitizer = require('../utils/sanitize')
const axios = require("axios")

//Heart Logic (Change This if streaming don't works!)
async function getURL(id,play){
    let link = play["source"]["0"];
    //Check If URL is Working
    try{
        await axios.head(link);

        if(link.includes('m3u8'))
            link=play["source"]["0"];
        else
            link = process.env.CORS_URL + play["source"]["0"];
    }
    catch(err){
        //Else Check if backup URL Available
        try{
            await axios.head(play["source_bk"]["0"]);

            if(link.includes('m3u8'))
                link=play["source_bk"]["0"];
            else
                link = process.env.CORS_URL + play["source_bk"]["0"];
        }
        //Else Scrap URL From API
        catch(err){
            let d = await getDirectLink(id,play["movie_source"]);
            if(link.includes('m3u8'))
                link = d["source"]["0"];
            else
                link = process.env.CORS_URL +  d["source"]["0"];
        }
    }
    return link;
}


exports.playController= async(req,res)=>{
    
    let details = await Movie.getMovieDetails(req.query.id);
    let play = details["playing"];
    let id = details['id'];
    if(!play["source"])
        return res.redirect("/");

    let link = await getURL(id,play);
    
    res.render("movie",{
        title: play["title"],
        sourceLink: link,
        episodes:play["source"],
        sideLinks:details["sideLinks"],
        description:play["description"],
        sanitizer:sanitizer
    });
}