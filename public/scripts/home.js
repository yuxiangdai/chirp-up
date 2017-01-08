var signInButton = document.getElementById('sign-in');
var chatroomButton = document.getElementById('chatroom');
var signOutButton = document.getElementById('sign-out');
var retakeButton = document.getElementById('retake');
var provider = new firebase.auth.FacebookAuthProvider();

retakeButton.addEventListener('click', function() {
   $('#foes').hide();
   $('#survey').show();
   $('#retake').hide();
});
signOutButton.addEventListener('click', function() {
   firebase.auth().signOut().then(function() {
      window.location.href = '/';
   }, function(err) {
      console.log(err);
   });
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
     $('#agreeable').show();
     //fix this if implemented in the future: this is ad hoc for demo
     firebase.database().ref("/users").on('value', function(snapshot) {
       var userId = user.uid;
       var userAnswers = snapshot.child(userId).val().answers;
       console.log(userAnswers + "yoooo");
       snapshot.forEach(function(childSnapshot) {
          var foeName = childSnapshot.val().name;
          var foeFirstName = foeName.split(" ").shift();
          var foeAnswers = childSnapshot.child("answers").val();
          if(foeAnswers.answer1 != userAnswers.answer1 || foeAnswers.answer2 != userAnswers.answer2) {
             $('#foes').append("<a href='/chatroom'>" + foeFirstName + "</a>");
             $('#agreeable').hide();
          }
       });
     });
     //end of major fix

    //check if user has answers already: if so, suggest foes
    firebase.database().ref("/users/" + user.uid).on('value', function(snapshot) {
      var answers = snapshot.val().answers;
      if(answers == "none") {
         $('#survey').show();
         $('#foes').hide();
      } else {
         $('#foes').show();
         $('#survey').hide();
      }
    });
    // User is signed in.
    $('#sign-in').hide();
    console.log(user.displayName);
    var userString = user.displayName;
    var strArray = userString.split(" ");
    strArray.pop();
    var firstName = strArray.join('');
    $("#welcome").append("Welcome " + firstName);
    console.log('firstName');
    $('#uid').attr("value", user.uid);
    updateUsers(user);
    $('#sign-out').show();
    $('#chatroom').show();
    $('#retake').show();
  } else {
     // No user is signed in.
     $('#survey').hide();
     $('#sign-out').hide();
     $('#chatroom').hide();
     $('#foes').hide();
     $('#retake').hide();
     $('#sign-in').show();
  }
});
