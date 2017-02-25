var config = {
	apiKey: "AIzaSyAojUKRBIzZnQGw0ntTC-I6tY9hIPRkSzk",
	authDomain: "lynkea-d0040.firebaseapp.com",
	databaseURL: "https://lynkea-d0040.firebaseio.com",
	storageBucket: "lynkea-d0040.appspot.com",
	messagingSenderId: "964830719483"
};
firebase.initializeApp(config);
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		// User is signed in.
		console.log('Logged in as ' + user.displayName);
	}else{
		// Let's try to get a Google auth token programmatically.
		console.log('Not logged in');
	}
});


function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

function startSignIn() {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut();
	}else{
		startAuth(true);
	}
}