const Movie = require('../models/movie')
const {getDirectLink} = require('../utils/getDirectLink')
const sanitizer = require('../utils/sanitize')
const axios = require("axios")

exports.playController= async(req,res)=>{
    
    let details = await Movie.getMovieDetails(req.query.id);
    let play = details["playing"];
    let id = details['id'];
    if(!play["source"])
        return res.redirect("/");

    let link = play["source"]["0"];

    //Check If URL is Working
    try{
        if(link.includes("vidnext.net/ajax.php")){
            throw new Error("err");
        }
        let a = await axios.head(link);
        console.log(a);
        link = process.env.CORS_URL + play["source"]["0"]
    }
    catch(err){
        //Else Check if backup URL Available
        try{
            if(link.includes("vidnext.net/ajax.php")){
                throw new Error("err");
            }
            let a = await axios.head(play["source_bk"]["0"]);
            console.log(a);
            link = process.env.CORS_URL + play["source_bk"]["0"]
        }
        //Else Scrap URL From API
        catch(err){
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
    });
}