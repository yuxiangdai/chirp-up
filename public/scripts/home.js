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

var updateUsers = function(user) {
   console.log("updating users");
   var userPresent = false;
   var userId = user.uid;
   console.log(userId);
   var userRef = firebase.database().ref("/users/" + userId);
   userRef.once('value').then(function(snapshot) {
      var val = snapshot.val();
      if(val != null) {
         userPresent = true;
      }
      console.log(userPresent);
      if(!userPresent) {
         var data = {
            name: user.displayName,
            email: user.email,
            answers: "none"
         };
         firebase.database().ref("/users").child(userId).set(data);
      }
   });
}
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
    $('#uid').attr("value", user.uid);
    updateUsers(user);
  } else {
     // No user is signed in.
  }
});
