require('dotenv').config();
var express = require("express");
var path = require("path");
var helmet = require('helmet');
var connectDB = require("./config/db");
var indexRoute = require("./routes/index");
var movieRoute = require("./routes/movies");
var searchRoute = require("./routes/search");
var apiRoute = require("./routes/api")
var app = express();

//Connecting To Database
connectDB();

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Encoding
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use('/favicon.ico', express.static('./public/imgs/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", indexRoute);
app.use("/movie", movieRoute);
app.use("/search",searchRoute);

//API Routes
app.use("/api",apiRoute);



app.use((req,res)=>{
    res.status(404).render('404')
})

module.exports = app;