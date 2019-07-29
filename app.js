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

  var options = {
    //url from mailchimp request example (npm documentation)... url/list/{list_id}
    url: 'https://us3.api.mailchimp.com/3.0/lists/31b3e59a84',
    method: 'POST', //default is GET
    //authentication using node - we use headers
    headers: {
      //consists of any string as username & apikey (read mailchimp)
      "Authorization": "devops44 e346e603e01a66bb67acb6356defedfb-us3"
    },
    body: jsonData
  };

  //NPM Request - read npm documentation
  request(options, function(err, res, body) {
    if (err) return console.log(err); //if an error has occured during request function
    console.log(res.statusCode);
  });

});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});


//api key
//e346e603e01a66bb67acb6356defedfb-us3

//list-id
//31b3e59a84
