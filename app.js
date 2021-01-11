var express = require("express");
var path = require("path");
var indexRoute = require("./routes/index");
var movieRoute = require("./routes/movies");
var searchRoute = require("./routes/search");
var mongoose = require("mongoose");
var app = express();
mongoose.connect("mongodb+srv://hackingguy:akash710@cluster0.qvgbg.mongodb.net/movies?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log("Connected To Database"))
  .catch((err) => console.log(err));


//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Encoding
app.use('/favicon.ico', express.static('./public/imgs/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", indexRoute);
app.use("/movie", movieRoute);
app.use("/search",searchRoute);


module.exports = app;