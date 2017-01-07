var express = require('express');
var app = express();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDuf3gqHFDVEwkXveDlVT7jrW58MzdnR7Q",
    authDomain: "chirp-up.firebaseapp.com",
    databaseURL: "https://chirp-up.firebaseio.com",
    storageBucket: "chirp-up.appspot.com",
    messagingSenderId: "66307837599"
};

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(__dirname + "/chirp-up-firebase-adminsdk-ftpw7-139d5bd98b.json"),
  databaseURL: "https://chirp-up.firebaseio.com"
});

firebase.initializeApp(config);

app.get('/', function(req, res) {
   res.send('hello world');
});

app.listen(process.env.PORT || 3000, function() {
   console.log("listening...");
});
