const Movie = require('../models/movie')
const sanitizer = require('../utils/sanitize')
exports.searchController = (req,res)=>{
    Movie.search(req.query.q).then(data=>{
        res.render('index',{
            movies:data,
            sanitizer:sanitizer,
            search:true,
            top10:false
        })
    })
}