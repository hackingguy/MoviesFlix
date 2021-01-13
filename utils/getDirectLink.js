const axios = require('axios');

module.exports.getDirectLink = async(link)=>{
    if(link.indexOf("https://vidnext.net")!=-1){
       response = await axios.get(link,{
            headers:{
                "X-Requested-With":"XMLHttpRequest"
            }
        });
        let movie = response.data;
        if(movie["source"].length>0){
            movie["source"] = {"0":"https://cors.maplehacks.ml/"+movie["source"][0]["file"]}
            return movie;
        }
    }
    else{
        return {source:{}};
    }
}