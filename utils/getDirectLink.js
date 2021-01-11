const axios = require('axios');
const cheerio = require('cheerio');

module.exports.getDirectLink = async(link)=>{
    if(link.indexOf("https://vidnext.net")!=-1){
       let response =  await axios.get(link);
       let $ = cheerio.load(response.data);
       let l = $('iframe').first().attr('src');
       response = await axios.get("https:"+l.replace("streaming","ajax"),{
            headers:{
                "X-Requested-With":"XMLHttpRequest"
            }
        });
        let movie = response.data;
        if(movie["source"].length>0){
            movie["source"] = {"1":"https://cors.maplehacks.ml/"+movie["source"][0]["file"]}
            return movie;
        }
    }
    else{
        return {source:[]}
    }
}

