const {cinema} = require('../models/movie')
const sanitizer = require('../utils/sanitize')
exports.searchController = (req,res)=>{
    cinema.search(req.query.q).then(data=>{
        res.render('index',{
            movies:data,
            sanitizer:sanitizer
        })
    })
}