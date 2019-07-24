//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//incorporating images and bootstrap into our application into the public folder
app.use(express.static("public"));

//using bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  console.log(firstName, lastName, email);

});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
