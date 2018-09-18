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
     
        // axios.get("https://www.npr.org/").then(function(response) {
        //  axios.get("https://www.nytimes.com/").then(function(response) {
            axios.get("  http://www.echojs.com/").then(function(response) {
          
       //     console.log(response.data);
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
          // Now, we grab every h2 within an article tag, and do the following:
         //  $("article.css-180b3ld").each(function(i, element) {
       //     $("article.post-type-standard").each(function(i, element) {
        //     // Save an empty result object
       //        var result = {};
      
        //     // Add the title and summary of every link, and save them as properties of the result object
        //    //  result.title = $(this).children("h2").children("span.balancedHeadline").text();
            // result.title =$(this).children("a").children("h2").children("span").text();
            // result.link = $(this).children("a").attr("href");
            // result.summary=$(this).children("a").children("h2").children("span").text();
           //  result.summary = $(this).children("a").children("h2").children("span.balancedHeadline").text();
                
        //    result.title = $(this).children(".story-wrap").children(".story-text").children("a h3").text();
        //    result.link = $(this).children(".story-wrap").children(".story-text").children("a").attr("href");
        //    result.summary =  $(this).children(".story-wrap").children(".story-text").children("a p").text();

        //    result.title = "hello 1";
        //    result.link = "hello 2";
        //    result.summary = "hello 3";

            //Echo JS TEST code scraping for testing 
            $("article h2").each(function(i, element) {
                // Save an empty result object
                var result = {};
          
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                  .children("a")
                  .text();
                result.link = $(this)
                  .children("a")
                  .attr("href");
                  result.summary = $(this)
                  .children("a")
                  .text();
            //End of test code 

           // console.log(JSON.stringify(result));
            // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });     
               
        });
        res.send("*****complete");
    });
});
}