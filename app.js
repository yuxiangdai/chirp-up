var express = require('express');
var app = express();
var firebase = require('firebase');
app.use(express.static('public'));
app.set('view engine', 'ejs');

var config = {
    apiKey: "AIzaSyDuf3gqHFDVEwkXveDlVT7jrW58MzdnR7Q",
    authDomain: "chirp-up.firebaseapp.com",
    databaseURL: "https://chirp-up.firebaseio.com",
    storageBucket: "chirp-up.appspot.com",
    messagingSenderId: "66307837599"
};

firebase.initializeApp(config);

var database = firebase.database();

app.get('/', function(req,res) {
   res.render('home');
});

app.get('/discuss', function(req,res) {
   res.render('discuss');
});

app.get('/topics', function(req,res) {
   res.render('topics');
});

function initializeDatabase(userId){

  firebase.database().ref('users/' + userId).set({
    "responses":{
      "topic":{
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

function answerSurvey(userId, topic, yesno, reasoning) {
  firebase.database().ref('users/' + userId + '/responses/topic/' + topic + '/question' ).set({
    "yesno": yesno,
    "reasoning": reasoning
  });
}

app.get('/chatroom', function(req,res) {
   res.render('chatroom');
});

app.listen(process.env.PORT || 3000, function() {
   console.log("listening");
});
