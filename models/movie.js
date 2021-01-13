const mongoose = require("mongoose");
const schema = mongoose.Schema;

const moviesSchema = new schema({
  movie_link: String,
  movie_source:String,
  title: String,
  poster: String,
  description: String,
  source: Object,
});

class Movies {
  constructor(document) {
    this.document = document;
    this.model = mongoose.model(document, moviesSchema);
  }

  async getMovies(size, pageNum) {
    let movies = await this.model
      .find()
      .skip((pageNum - 1) * size)
      .limit(size)
      .sort({ _id: -1 })
      .select({ poster: 1, title: 1 });
    return movies;
  }

  async getMovieDetails(id) {
    let movie = await this.model
      .findOne({ _id: id })
      .select({ title: 1, source: 1 , source_bk: 1, movie_source:1});
    let sideLinks = await this.getMovies(6, 1);      
    return { playing: movie, sideLinks: sideLinks };
  }

  async search(q) {
    let found = await this.model
      .find({ title: { $regex: q, $options: "i" } })
      .select({ poster: 1, title: 1 });
    return found;
  }
}

module.exports.dubbed = new Movies("movies");
module.exports.hollywood = new Movies("vidnexts");
module.exports.cinema = new Movies("cinema-movies");
module.exports.series = new Movies("vidnexts-tv-series");
