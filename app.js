//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Check out my latest posts!";
const aboutContent = "This is my blog/diary site where I ramble on about all mundane things that happen in my life.";
const contactContent = "email: andruha1067@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
  //console.log(posts);
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    titleText: req.body.titleText,
    bodyText: req.body.bodyText
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/:posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.titleText);
    //console.log(requestedTitle, storedTitle);
    if (requestedTitle === storedTitle) {
      res.render("post", {
        titleText: post.titleText,
        bodyText: post.bodyText});
    }
  })
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
