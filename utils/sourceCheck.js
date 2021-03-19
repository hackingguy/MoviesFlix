var {getDirectLink} = require('./getDirectLink');
const Movie = require('../models/movie');

module.exports = async()=>{
    let movies = await Movie.model.find({source:{}});
    movies.forEach(movie=>{
        getDirectLink(movie["_id"],movie["movie_source"])
    })
}