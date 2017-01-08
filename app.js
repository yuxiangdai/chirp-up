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


app.get('/', function(req,res) {
   res.render('home');
});

app.get('/chatroom', function(req,res) {
   res.render('chatroom');

});

app.listen(process.env.PORT || 3000, function() {
   console.log("listening");
});
