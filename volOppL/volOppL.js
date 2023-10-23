// ----- Variable Declarations -----
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", parseInt(localStorage.getItem("zipCode")));
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);

// ----- Function Declarations -----
//THIS ISNT WORKING RIGHT NOW
//IBRAHEEM NEEDS TO DO THE ZIPCODE TO LAT LONG FUNCTION
// Convert zipcode to Latitude and Longitude
    // Replace this with actual implementation
    // Example: return {latitude: 37.7749, longitude: -122.4194};
    // Import Axios library to make HTTP requests (you need to include Axios in your project).
const axios = require('axios');

// Define your Google Geocoding API key.
const API_KEY = 'AIzaSyBgiraRrh_2CcYYH1HRipAIycrE_cqlfKA';

// Function to convert a zip code to latitude and longitude coordinates.
async function zipcodeToLatLong(ZCode) {
  try {
    // Construct the request URL for the Google Geocoding API.
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ZCode}&key=${API_KEY}`;

    // Make an HTTP GET request to the API.
    const response = await axios.get(apiUrl);

    // Check if the request was successful.
    if (response.data.status === 'OK') {
      // Extract latitude and longitude from the response.
      const location = response.data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      return { latitude, longitude };
    } else {
      // Handle error cases.
      console.error('Error geocoding the ZIP code:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Error making the API request:', error);
    return null;
  }
}

// Define the zipcode and search for opportunities based on it
function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', parseInt(zipCode));
    txtBx.placeholder = "Volunteer Opportunities near " + zipCode;
    txtBx.value = "";

    let coords = zipcodeToLatLong(zipCode);
    searchPlacesNearLocation(coords.latitude, coords.longitude);
}

function nextPg() {
    defineZipCode(zipCode);

    // Validate the ZIP code and execute the callback if it's valid
    if (isProbablyValidUSZipCode(zipCode)) {
    } else {
        alert("Please enter a valid ZIP code.");
    }
}

// Modify this function to include the redirection logic
function redirectToVolOppL() {
    // Redirect to the volOppList view
    window.location.href = "../volOppL/volOppL.html";
}

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        nextPg();
    }
}

// Function to be executed after ZIP code validation
function afterZipCodeValidation() {
    // Store text from the textbox if needed
    defineZipCode(zipCode);

    // Call the redirection function
    redirectToVolOppL();
}

// Example of how to use the modified nextPg function
nextPg(afterZipCodeValidation);

// Rest of your code remains the same
function isProbablyValidUSZipCode(zipCode) {
    // ... (unchanged)
}

function checkAgainstPattern(zipCode, pattern) {
    // ... (unchanged)
}

function isDigit(character) {
    // ... (unchanged)
}


function isDigit(character) {
    return character >= '0' && character <= '9';
}





// Toggle opportunity type tab
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../donOpp/donOpp.html";
}


// Search for places near the location based on latitude and longitude
function searchPlacesNearLocation(latitude, longitude) {
    //const apiKey = [insertApiCodeHere!!]; 
    const radius = 50000;  // 50km radius
    const type = 'point_of_interest'; 
    const keyword = 'volunteer'; 

    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;
    
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length) {
            const promises = data.results.slice(0, 4).map(place => getPlaceDetails(place.place_id, apiKey));
            Promise.all(promises)
                .then(details => displayResults(details));
        } else {
            console.error("No places found or error occurred.");
        }
    })
    .catch(error => {
        console.error("Error fetching places:", error);
    });
}

// Get the detailed information about a place
function getPlaceDetails(placeId, apiKey) {
    const detailsEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,website&key=${apiKey}`;
    return fetch(detailsEndpoint)
        .then(response => response.json())
        .then(data => data.result)
        .catch(error => console.error("Error fetching place details:", error));
}

// Display the fetched results on the webpage
function displayResults(placesDetails) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    placesDetails.forEach(place => {
        const websiteLink = place.website ? `<a href="${place.website}" target="_blank">${place.website}</a>` : 'No website available';
        resultsDiv.innerHTML += `
            <div class="result-card">
                <strong>${place.name}</strong>
                <p>Website: ${websiteLink}</p>
            </div>
        `;
    });
}



// JAVASCRIPT FOR VOLX PARTNERS:
// Table for data from the database
// FIREBASE ACCESS
// Initialize Firebase with your project configuration
const firebaseConfig = {
    projectId: 'volx-1',
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Array to store data from the database
let itemsArray = [];

// Function to retrieve data from the database
function getItemsFromFirestore() {
    return db.collection('parsedData') // Replace with the name of your Firestore collection
        .get()
        .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                // Access the data for each document
                data.push(doc.data());
            });
            return data;
        })
        .catch((error) => {
            console.error('Error getting Firestore data: ', error);
        });
}

// Use an async function to wait for the Firestore data to be fetched
async function fetchData() {
    try {
        itemsArray = await getItemsFromFirestore();
        console.log(itemsArray); // comment this after debugging
    } catch (error) {
        console.error(error);
    }
}

fetchData(); // Call the function to fetch and display data

// function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
}

// go through every row in database
for (let r = 0; r < myArray.length; r++) {
    // check if row is volunteer opportunities
    // (if first letter of V/D is 'v' then confirm)
    console.log(r);
    if (myArray[r][5].charAt(0).toLowerCase() === 'v') {
        // get last 5 digits of address (for the ZipCode)
        // first convert the digits to integer
        let volOppZipCode = parseInt(myArray[r][1].slice(-5));
        console.log(volOppZipCode);
        
        // check the distance between the zipCode that is user-entered and the item on the database
        let volOppLat = 1; // placeholder; really call the function to define lon & lat based on ZipCode
        let volOppLon = 1;// placeholder; really call the function to define lon & lat based on ZipCode
        let localLat = 2;// placeholder; really call the function to define lon & lat based on ZipCode
        let localLon = 2;// placeholder; really call the function to define lon & lat based on ZipCode

        console.log(calculateDistance(volOppLat, volOppLon, localLat, localLon));
        // if the distance is under a certain amount then proceed
        if (calculateDistance(volOppLat, volOppLon, localLat, localLon) < 50) {
            // create new row
            const newRow = table.insertRow();

            // fill out data
            newRow.insertCell(0).textContent = myArray[r][2];
            newRow.insertCell(1).textContent = myArray[r][0];
            newRow.insertCell(2).textContent = myArray[r][4];
            newRow.insertCell(3).textContent = myArray[r][1];
            newRow.insertCell(4).textContent = myArray[r][6];
            newRow.insertCell(5).textContent = myArray[r][3];
        }
    }
}






// JavaScript function to return users to the home screen
function goToHomeScreen() {
    window.location.href = "../home/home.html"; 
}
 


// ----- Initial Script Logic -----

txtBx.placeholder = "Volunteer Opportunities near " + zipCode;

