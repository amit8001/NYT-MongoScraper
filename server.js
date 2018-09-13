var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); //Mongoose ODM NPM package
var cheerio = require("cheerio");

var PORT = process.env.port || 3000;

// Initialize Express
var app = express();

//require the routes.js file and pass the router object as argument
require("./controllers/scrape.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNewsscraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  