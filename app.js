require('dotenv').config();
const path = require("path");
const helmet = require('helmet');
const express = require("express");
const compression = require('compression');
const app = express();

const connectDB = require("./config/db");
const indexRoute = require('./routes/index');
const homeRoute = require("./routes/home");
const playRoute = require("./routes/play");
const searchRoute = require("./routes/search");
const apiRoute = require("./routes/api");
const authRoute = require('./routes/auth');
const favRoute = require('./routes/fav');
const maintainanceRoute = require('./routes/maintainance');
const editProfileRoute = require('./routes/editProfile');

//Connecting To Database
connectDB();

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Encoding
app.use(compression());
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use('/favicon.ico', express.static('./public/imgs/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/",indexRoute);
app.use("/home", homeRoute);
app.use("/movie", playRoute);
app.use("/search",searchRoute);
app.use("/edit-profile",editProfileRoute)
app.use("/maintainance",maintainanceRoute);
app.use(favRoute);
app.use(authRoute);

//API Route
app.use("/api",apiRoute);

app.use((req,res)=>{
    res.status(404).render('404')
})

module.exports = app;