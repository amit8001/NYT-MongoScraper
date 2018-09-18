// Import the model 
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongoose = require("mongoose");

//Scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app) {

    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        console.log("Hellow");
        //axios.get("https://www.npr.org/").then(function(response) {
        axios.get("https://www.nytimes.com/section/us").then(function(response) {
            //    axios.get("  http://www.echojs.com/").then(function(response) {

            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:

            $("article.story").each(function(i, element) {
                //     // Save an empty result object


                var result = {};


                result.title = $(this).children(".story-body").children("a.story-link").children(".story-meta")
                    .children("h2.headline").text();
                result.link = $(this).children(".story-body").children("a.story-link").attr("href");
                result.summary = $(this).children(".story-body").children("a.story-link").children(".story-meta")
                    .children("p.summary").text();

            //code for article saving without promises//
                db.Article.create(result, function(error) {
                    if (error) {
                        console.log("Error in Article Creation - " + error);
                    }
                })
            
            //end of code for article saving without promises//
            
            //code for article saving with promises//
                // db.Article.create(result)
                // .then(function(dbArticle) {
                // // View the added result in the console
                // console.log(dbArticle);

                //         db.Article.find({
                //              "saved": false
                //         }, function(error, data) {
                //             if (error) {
                //                 console.log("Error in extracting data - " + error);
                //             } else {
                //                 console.log(data.length);
                //                 res.json(data);
            
                //             }
            
                //         });

                // })
                //  .catch(function(err) {
                // //     // If an error occurred, send it to the client
                //   return res.json(err);
                //  console.log("Error in Article Creation - " + error);
                //  })
                ;

            //

            });


            //working code start for finding ...need to add in promise section
            // db.Article.find({
            //     // "saved": false
            // }, function(error, data) {
            //     if (error) {
            //         console.log("Error in extracting data - " + error);
            //     } else {
            //         console.log(data.length);
            //         res.json(data);

            //     }

            // });
            //end of working code 

        })
        .then 
        (
            db.Article.find({
                // "saved": false
            }, function(error, data) {
                if (error) {
                    console.log("Error in extracting data - " + error);
                } else {
                    console.log(data.length);
                    res.json(data);

                }

            })
        )

    });
}