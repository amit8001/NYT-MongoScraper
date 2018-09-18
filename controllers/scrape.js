// Import the model 
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongoose = require("mongoose");

//Scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function (app) {

	app.get("/scrape", function (req, res) {
		// First, we grab the body of the html with request
		console.log("Hellow");
		axios.get("https://www.nytimes.com/section/us").then(function (response) {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(response.data);

			// Now, we grab every h2 within an article tag, and do the following:

			$("article.story").each(function (i, element) {
				//     // Save an empty result object


				var result = {};


				result.title = $(this).children(".story-body").children("a.story-link").children(".story-meta")
					.children("h2.headline").text();
				result.link = $(this).children(".story-body").children("a.story-link").attr("href");
				result.summary = $(this).children(".story-body").children("a.story-link").children(".story-meta")
					.children("p.summary").text();

				//code for article saving without promises//
				// db.Article.create(result, function(error) {
				//     if (error) {
				//         console.log("Error in Article Creation - " + error);
                //     } 
				// })

				db.Article.create(result)
					.then(function (dbArticle) {
						//View the added result in the console.
						console.log(dbArticle);
					})
					.catch(function (err) {
						//If an error occured, send it to the client.
						return res.json(err);
					});
			})
            //res.json(result);
            res.send("Scrape Complete");
		})
	})
}