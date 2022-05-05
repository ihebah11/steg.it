//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
let _ = require("lodash");

const homeStartingContent = "heeeeeeeelp meeeeeeee  "
const aboutContent = "ejroooooooooooli"
const contactContent = "ini a8raaaaaaaaaaaaaaa9"
const app = express();
let postDetails = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    posts : postDetails

  });

});
app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.post("/compose", function(req, res) {
 let post = {title : req.body.postTitle , content : req.body.postText}
 postDetails.push(post);
 res.redirect("/");

});

app.get("/posts/:postName", function(req,res){

    const requestedTitle = _.lowerCase(req.params.postName) ;
    postDetails.forEach(function(post){
      const storedTitle = _.lowerCase(post.title) ;
      if (storedTitle === requestedTitle) {
        res.render("post", {title : post.title , content : post.content
      });
  }
});
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
