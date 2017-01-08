var express = require('express');
var app = express();
var firebase = require('firebase');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
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

app.post('/', function(req,res) {
   var answer1 = req.body.q1;
   var answer2 = req.body.q2;
   var userId = req.body.uid;
   var data = {
      answer1: answer1,
      answer2: answer2
   };
   if(userId != null) {
      firebase.database().ref("users/" + userId).child("answers").set(data);
      res.render("home");
      console.log(userId);
   } else {
      console.log("Problem with retrieving uid");
      res.send("error");
   }
});

app.get('/chatroom', function(req,res) {
   res.render('chatroom');
});

app.listen(process.env.PORT || 3000, function() {
   console.log("listening");
});
