const {cinema} = require('../models/movie')

exports.searchController = (req,res)=>{
    cinema.search(req.query.q).then(data=>{
        res.render('index',{
            movies:data
        })
    })
}