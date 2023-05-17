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

// Dashboard Form
const dashboardForm = document.querySelector("#dashboard-form");
dashboardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = firebase.auth().currentUser;

  if (user) {
    const name = dashboardForm["name"].value;
    const address = dashboardForm["address"].value;
    const bio = dashboardForm["bio"].value;

    db.collection("users")
      .doc(user.uid)
      .set({
        name: name,
        address: address,
        bio: bio,
      })
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is logged in, allow access to dashboard
    if (window.location.pathname === "/dashboard.html") {
      // Retrieve user data from Firestore
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            dashboardForm["name"].value = data.name || "";
            dashboardForm["address"].value = data.address || "";
            dashboardForm["bio"].value = data.bio || "";
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      // Redirect to dashboard if not on the dashboard page
      window.location.href = "dashboard.html";
    }
  } else {
    // User is not logged in, redirect to login page
    if (
      window.location.pathname !== "/index.html" &&
      window.location.pathname !== "/register.html"
    ) {
      window.location.href = "index.html";
    }
  }
});

// Logout Button
const logoutButton = document.querySelector("#logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Redirect to login page after logout
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
