firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // User is not logged in, redirect to the login page
    window.location.href = "index.html";
  } else {
    // User is logged in, continue with the page initialization
    initializePage(user);
  }
});

function initializePage(user) {
  // Create the map and center it on a starting point
  const map = L.map("map").setView([41.9028, 12.4964], 13);

  // Set OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  //  firebase
  // Dashboard
  const dashboardForm = document.querySelector("#form");
  if (dashboardForm) {
    // const imagePreview = document.querySelector("#image-preview");
    const imageInput = document.querySelector("#img");

    // // Image upload preview
    // imageInput.addEventListener("change", (e) => {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     const img = document.createElement("img");
    //     img.src = e.target.result;
    //     img.style.maxWidth = "200px";
    //     img.style.maxHeight = "200px";
    //     imagePreview.innerHTML = "";
    //     imagePreview.appendChild(img);
    //   };

    //   reader.readAsDataURL(file);
    // });

    dashboardForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = firebase.auth().currentUser;

      if (user) {
        const citta = dashboardForm["city"].value;
        const startDate = dashboardForm["startDate"].value;
        const endDate = dashboardForm["endDate"].value;
        const desc = dashboardForm["desc"].value;
        const imageFile = imageInput.files[0];

        const uploadTask = storage
          .ref()
          .child(`images/${user.uid}/${imageFile.name}`)
          .put(imageFile);
        uploadTask
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          })
          .then((imageUrl) => {
            db.collection("users")
              .add({
                userId: user.uid, // Add a unique identifier to associate with the user
                citta: citta,
                startDate: startDate,
                endDate: endDate,
                desc: desc,
                imageUrl: imageUrl,
              })
              .then(() => {
                alert("Data saved successfully!");
                dashboardForm.reset(); // Reset the form
              })
              .catch((error) => {
                alert(error.message);
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    const logoutButton = document.querySelector("#logout-btn");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.href = "index.html";
          })
          .catch((error) => {
            alert(error.message);
          });
      });
    }
  }

  // end firebase

  db.collection("users")
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //   // Retrieve values from form fields
        const citta = data.citta;
        const startDate = data.startDate;
        const endDate = data.endDate;
        const desc = data.desc;

        //   // Perform reverse geocoding request to obtain coordinates from the city
        const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          citta
        )}`;
        fetch(geocodingUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const { lat, lon } = data[0];

              // Create a marker with a popup at the obtained coordinates
              const marker = L.marker([lat, lon]).addTo(map);
              let popupContent = `<b>${citta}</b>`;

              if (startDate.trim() !== "" && endDate.trim() !== "") {
                popupContent += `<br>${startDate} - ${endDate}`;
              }

              if (desc.trim() !== "") {
                popupContent += `<br>${desc}`;
              }
              if (data.imageUrl) {
                console.log(data.imageUrl);
                popupContent += `<a href="#" target="_blank"><img src="${
                  data.imageUrl
                }" alt="Image ${
                  index + 1
                } of ${citta}" class="popup-image"></a>`;
              }
              //         images.forEach((image, index) => {
              //           if (image) {
              //             popupContent += `<a href="#" target="_blank"><img src="${image}" alt="Image ${
              //               index + 1
              //             } of ${citta}" class="popup-image"></a>`;
              //           }
              //         });

              marker.bindPopup(popupContent).openPopup();
            } else {
              alert("Unable to find the city: " + citta);
            }
          });
      });
    })
    .catch((error) => {
      alert(error.message);
    });

  // // Handle form submission
  // document.getElementById("form").addEventListener("submit", async (e) => {
  //   e.preventDefault();

  //   // Retrieve values from form fields
  //   const citta = document.getElementById("citta").value;
  //   const startDate = document.getElementById("startDate").value;
  //   const endDate = document.getElementById("endDate").value;
  //   const desc = document.getElementById("desc").value;
  //   const imgInput = document.getElementById("img");
  //   const imgs = imgInput.files;

  //   // Create a FileReader to read data for each image
  //   const readers = Array.from(imgs).map((img) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(img);
  //     return new Promise((resolve) => {
  //       reader.onloadend = () => {
  //         resolve(reader.result);
  //       };
  //     });
  //   });

  //   // Wait for all FileReader operations to finish
  //   const images = await Promise.all(readers);

  //   // Check if at least the city field is filled
  //   if (citta.trim() === "") {
  //     alert("Please enter the city name");
  //     return;
  //   }

  //   // Perform reverse geocoding request to obtain coordinates from the city
  //   const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
  //     citta
  //   )}`;

  //   fetch(geocodingUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.length > 0) {
  //         const { lat, lon } = data[0];

  //         // Create a marker with a popup at the obtained coordinates
  //         const marker = L.marker([lat, lon]).addTo(map);
  //         let popupContent = `<b>${citta}</b>`;

  //         if (startDate.trim() !== "" && endDate.trim() !== "") {
  //           popupContent += `<br>${startDate} - ${endDate}`;
  //         }

  //         if (desc.trim() !== "") {
  //           popupContent += `<br>${desc}`;
  //         }

  //         images.forEach((image, index) => {
  //           if (image) {
  //             popupContent += `<a href="#" target="_blank"><img src="${image}" alt="Image ${
  //               index + 1
  //             } of ${citta}" class="popup-image"></a>`;
  //           }
  //         });

  //         marker.bindPopup(popupContent).openPopup();
  //       } else {
  //         alert("Unable to find the city: " + citta);
  //       }
  //     })
  //     .catch((error) => alert("An error occurred: " + error));
  // });
}
