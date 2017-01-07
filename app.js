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
  credential: admin.credential.cert("path/to/serviceAccountKey.json"),
  databaseURL: "https://chirp-up.firebaseio.com"
});

firebase.initializeApp(config);
