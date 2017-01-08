var signInButton = document.getElementById('sign-in');
var chatroomButton = document.getElementById('chatroom');
var signOutButton = document.getElementById('sign-out');
var provider = new firebase.auth.FacebookAuthProvider();
signOutButton.addEventListener('click', function() {
   firebase.auth().signOut().then(function() {
      window.location.href = '/';
   }, function(err) {
      console.log(err);
   });
});
chatroomButton.addEventListener('click', function() {
   window.location.href = '/chatroom';
   console.log('chatroom button clicked');
});
signInButton.addEventListener('click', function() {
   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
   });
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.displayName);
    var userString = user.displayName;
    var strArray = userString.split(" ");
    strArray.pop();
    var firstName = strArray.join('');
    $("p").append("Welcome " + firstName);
    console.log('firstName');
  } else {
    // No user is signed in.
  }
});
