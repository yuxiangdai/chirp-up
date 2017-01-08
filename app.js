var express = require('express');
var app = express();
var firebase = require('firebase');

app.set('view engine', 'ejs');

var config = {
    apiKey: "AIzaSyDuf3gqHFDVEwkXveDlVT7jrW58MzdnR7Q",
    authDomain: "chirp-up.firebaseapp.com",
    databaseURL: "https://chirp-up.firebaseio.com/",
    storageBucket: "chirp-up.appspot.com",
    messagingSenderId: "66307837599"
};

var admin = require("firebase-admin");
var database = firebase.database();

function initializeDatabase(userId){

  firebase.database().ref('users/' + userID).set({
    "responses":{
      "topic":{
          "politics":{
              "question": {
                  "text": "Do you think trump is a good president?",
                  "yesno": "",
                  "reasoning": ""
              }        
          },
          "nutrition":{
              "question": {
                  "text": "Would you eat genetically modified food?",
                  "yesno": "",
                  "reasoning": ""
              }
          },
          "life":{
              "question": {
                  "text": "Are you satistfied with your life?",
                  "yesno": "",
                  "reasoning": ""
          }
      }
  }
  }
  })
}

admin.initializeApp({
  credential: admin.credential.cert(__dirname + "/chirp-up-firebase-adminsdk-ftpw7-139d5bd98b.json"),
  databaseURL: "https://chirp-up.firebaseio.com"
});

firebase.initializeApp(config);
initializeDatabase("sdy1130");

app.get('/', function(req, res) {
   res.render('home');
});

app.listen(process.env.PORT || 3000, function() {
   console.log("listening...");
});
