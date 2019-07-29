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

//taking data from the form
app.post('/', function(req, res) {

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  //console.log(firstName, lastName, email);
  //linking the mailchimp server to subscribe users to our list

  //defining the body section to be sent in our request javascript objct
  var data = {
    //an array of objects mailchimp will accept as data
    members: [{
      email_address: email,
      status: 'subscribed', //check the mailchimp documentation on lists to subscribe
      //merge fields to capture firstname & lastName in the mailchimp merge fields
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };

  var jsonData = JSON.stringify(data); //parsing the javascript object to json format

  //combining keys from config.js
  var listId = config.listId;
  var apiKey = config.apiKey;

  var options = {
    //url from mailchimp request example (npm documentation)... url/list/{list_id}
    url: 'https://us3.api.mailchimp.com/3.0/lists/' + listId,
    method: 'POST', //default is GET
    //authentication using node - we use headers
    headers: {
      //consists of any string as username & apikey (read mailchimp)
      "Authorization": "devops44 " + apiKey
    },
    //body: jsonData
  };

  //NPM Request - read npm documentation
  request(options, function(error, response, body) {
    if (error) res.sendFile(__dirname + "/failure.html"); //if an error has occured during request function
    else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else
        res.sendFile(__dirname + "/failure.html");
    }
  });

});

//post method for the failure button in failure.html
app.post('/failure', function(req, res){
  res.redirect('/');
});

//server listening on port 3000
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});


//api key
//a16780f3e1bcbd7378131b097a26d5bc-us3

//list-id
//31b3e59a84
