module.exports = (title)=>{
    var formatted = title
                    .split("[18+] ")
                    .slice(-1)[0]
                    .split(" (")[0]
                    .split(" {")[0]
                    .split(" [")[0]
                    .split("Download ")
                    .slice(-1)[0]
                    .split("NetFlix ")
                    .slice(-1)[0]
                    .split(" HD 720p")[0]
                    .split(" HD-720p")[0]
                    .split(" HD-720")[0]
                    .split(" Hd-720p")[0]
                    .split(":")[0];
    return formatted;
}