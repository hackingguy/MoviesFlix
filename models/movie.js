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

  async updateMovie(id,link){
    var result = await this.model.updateOne({_id:id},{$set: {source:{"0":link}}});
    return result;
  }

  async getMovies(size, pageNum) {
    let movies = await this.model
      .find()
      .sort({ _id: -1 })
      .skip((pageNum - 1) * size)
      .limit(size)
      .select({ poster: 1, title: 1, description:1 });
    return movies;
  }

  async getMovieDetails(id) {
    let movie = await this.model
      .findOne({ _id: id })
      .select({ title: 1, source: 1 , source_bk: 1, movie_source:1,description:1});
    let sideLinks = await this.getMovies(6, 1);      
    return { playing: movie, sideLinks: sideLinks, id:id };
  }

  async search(q) {
    let found = await this.model
      .find({ title: { $regex: q, $options: "i" } })
      .select({ poster: 1, title: 1 });
    return found;
  }

  async isExists(id){
    let mv = await this.model.findOne({_id:id});
    if(!mv) return false;
    return true;
  }
}

module.exports.cinema = new Movies("movies");