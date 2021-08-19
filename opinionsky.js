// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAAwfoPJQfT48Lgw5f5MnSsK7asgIGnLQg",
    authDomain: "graffiti-ad6e0.firebaseapp.com",
    projectId: "graffiti-ad6e0",
    storageBucket: "graffiti-ad6e0.appspot.com",
    messagingSenderId: "1067846975936",
    appId: "1:1067846975936:web:3914044392fcb6a5cd0825",
    measurementId: "G-Z8PLGVD340"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    //Get value
    var message = getInputVal('message');

    // Save message
    saveMessage(message);
    document.getElementById('contactForm').reset();

}
// Function to get form value
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        message: message
    });

}

// READ MESSAGES 

function readMessages() {

    messagesRef.on('value', (snap) => {
        let container = document.getElementsByClassName("container")[0];
        container.innerHTML = "";
        Object.values(snap.val()).forEach(function(childSnap) {
            let n = childSnap;
            let container = document.getElementsByClassName("container")[0];
            var x = document.createElement("div");
            x.className = "bubble";
            x.innerText = " " + n.message;
            container.appendChild(x);
        });
    });
}

// SIGN UP WITH EMAIL
function signUpWithEmailPassword() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("pword").value;
    console.log(email)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            console.log("skapad och inloggad")
            var user = email;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}

// SIGN IN 
function signInWithEmailPassword() {

    console.log(document.getElementById("email"));
    var email = document.getElementById("email").value;
    var password = document.getElementById("pword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = email;
            // ...

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

}
// Check ig signed in or not and change ui depending on that 
firebase.auth().onAuthStateChanged((user) => {
    let b = document.getElementsByTagName("main");
    var v = document.getElementById("userName");
    if (user) {
        console.log("inloggad")
        b[0].className = "userSignedIn";
        v.innerText = "  " + user.email;
        form.style.display = "none";

    } else {
        b[0].className = "userSignedOut";
        v.innerText = "  WORLD";
    }
});

function signOut() {
    //SIGN OUT
    firebase.auth().signOut().then(() => {
        console.log("utoggad")
            // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
// toggle visibility of sign in form 
let form = document.getElementsByTagName("form")[1];
showSignInForm = () => {
    form.classList.toggle("hide")
}
closeSignInForm = () => {
    form.classList.toggle("hide")

}
readMessages();