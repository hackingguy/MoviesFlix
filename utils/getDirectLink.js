const axios = require('axios');
const {cinema} = require('../models/movie')

module.exports.getDirectLink = async(id,link)=>{
    if(link.indexOf("https://vidnext.net")!=-1){
       response = await axios.get(link,{
            headers:{
                "X-Requested-With":"XMLHttpRequest"
            }
        });
        let movie = response.data;
        if(movie["source"].length>0){
            console.log(id,movie['source']['0']['file'])
            cinema.updateMovie(id,movie['source']['0']['file']);
            movie["source"] = {"0":movie["source"][0]["file"]}
            return movie;
        }
    }
    else{
        return {source:{}};
    }
}