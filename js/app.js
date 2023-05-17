
// signup button
function toggleSignup() {
  document.getElementById("login-toggle").style.backgroundColor = "#fff";
  document.getElementById("login-toggle").style.color = "#222";
  document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
  document.getElementById("signup-toggle").style.color = "#fff";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

// login button
function toggleLogin() {
  document.getElementById("login-toggle").style.backgroundColor = "#57B846";
  document.getElementById("login-toggle").style.color = "#fff";
  document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  document.getElementById("signup-toggle").style.color = "#222";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCOnRhOLWMl9vTjuESemB_pBMvAGUzzBV0",
  authDomain: "travelmap-cee82.firebaseapp.com",
  projectId: "travelmap-cee82",
  storageBucket: "travelmap-cee82.appspot.com",
  messagingSenderId: "78061004715",
  appId: "1:78061004715:web:5ccbbb5086f29c4ac6d4ee",
  measurementId: "G-TR8R39XPBP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Login Form
const loginForm = document.querySelector("#signin-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Register Form
const registerForm = document.querySelector("#signin-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = registerForm["email"].value;
    const password = registerForm["password"].value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Google Login and Register Buttons
const googleLoginBtn = document.querySelector("#google-login-btn");
const googleRegisterBtn = document.querySelector("#google-register-btn");

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", () => {
    auth
      .signInWithPopup(googleProvider)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

if (googleRegisterBtn) {
  googleRegisterBtn.addEventListener("click", () => {
    auth
      .signInWithPopup(googleProvider)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Facebook Login and Register Buttons
const facebookLoginBtn = document.querySelector("#facebook-login-btn");
const facebookRegisterBtn = document.querySelector("#facebook-register-btn");

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope("email");

if (facebookLoginBtn) {
  facebookLoginBtn.addEventListener("click", () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

if (facebookRegisterBtn) {
  facebookRegisterBtn.addEventListener("click", () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
