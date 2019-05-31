//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://usYourServerNumber.api.mailchimp.com/3.0/lists/yourchimpmailID",
    method: "POST",
    headers: {
      "Authorization": "Kritapas1 your server"
    },
    body: jsonData
  };


  request(options, function(error, response, body){
    if(error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }else{
      console.log(response.statusCode);
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
      res.sendFile(__dirname + "/failure.html");
      }
    }
  });

  console.log(firstName, lastName, email);

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Listen to port 3000");
});
