// ----- Variable Declarations -----
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", localStorage.getItem("zipCode")); // add parseint() if required
let zipCode = localStorage.getItem("zipCode");
console.log(zipCode);
localStorage.setItem("listView", true);



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


function isProbablyValidUSZipCode(zipCode) {
    // First, check with the regex method for quick validation
    let regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (regex.test(zipCode)) {
        return true;
    }

    // If regex test fails, then check against your original patterns
    let patterns = ["#####", "#####-####"];
    for (let pattern of patterns) {
        if (checkAgainstPattern(zipCode, pattern)) {
            return true;
        }
    }
    return false;
}


function checkAgainstPattern(zipCode, pattern) {
    if (zipCode.length !== pattern.length) {
        return false;
    }

    for (let i = 0; i < pattern.length; i++) {
        let c = zipCode.charAt(i);
        switch (pattern.charAt(i)) {
            case '#':
                if (!isDigit(c)) {
                    return false;
                }
                break;

            default:
                if (c !== pattern.charAt(i)) {
                    return false;
                }
        }
    }
    return true;
}

function isDigit(character) {
    return character >= '0' && character <= '9';
}





// Toggle opportunity type tab
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../donOpp/donOpp.html";
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
async function fetchData(apiZipCodes) {
    try {
        itemsArray = await getItemsFromFirestore();
        displayVolOpp(apiZipCodes);
    } catch (error) {
        console.error(error);
    }
}

// USE ZIPCODE BASE TO RETURN LIST OF ZIPCODES WITHIN A DISTANCE OF 25 MILES
// construct API url
/*const zcApiUrl = `https://app.zipcodebase.com/api/v1/radius?apikey=321891d0-745c-11ee-983d-014c610a2320&code=${zipCode}&radius=40&country=us`;

// Make the API request
fetch(zcApiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // 'data.results' to get array for list of zipCodes in the range

    fetchData(data); // Call the function to fetch and display data from Firebase (pass the ZipCode in the parameter)
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
*/
  

//fetchData(); // Call the function to fetch and display data


// call function to run after data is fetched

function displayVolOpp(data) {
    console.log(data);
    console.log(data.results);
    // go through every row in database
    for (let r = 0; r < itemsArray.length; r++) {
        // check if row is volunteer opportunities
        // (if first letter of V/D is 'v' then confirm)
        if (itemsArray[r].V_or_D.charAt(0).toLowerCase() === 'v') {
            // get last 5 digits of address (for the ZipCode)
            // first convert the digits to integer
            console.log("yes it is volunteer");
            console.log(itemsArray[r]);
            let volOppZipCode = itemsArray[r].location.slice(-5);
            let inRange = false;
            let distance = 0;
            console.log(volOppZipCode);
            
            // for loop to check that zipCode is within radius
            // first check if the entered ZipCode is the same
            console.log("check if entered zipCode same as seeking zipCode")
            if (zipCode === volOppZipCode) {
                inRange = true;
                console.log("entered was same as volOppZC");
                console.log(inRange);
            } else {
                // loop through each value in array
                for (let i = 0; i < data.results.length; i++) {
                    if (data.results[i].location === volOppZipCode) {
                        inRange = true;
                        distance = data.results[i].distance;
                        console.log(inRange + " " + distance);

                        break;
                    }
                }
            }


            // if the distance is under a certain amount then proceed
            if (inRange) {
                console.log("we made it to the data spot!")
                // store data for opportuntity then display
                let orgName = itemsArray[r].organizationName;
                let oppDate = itemsArray[r].date;
                let oppTime = itemsArray[r].time;
                let oppLocation = itemsArray[r].location;
                let oppDistance = distance;
                let orgSite = itemsArray[r].website;
                let orgPhoneNum = itemsArray[r].phoneNum;

                console.log("orgName" + orgName +
                " oppDate" + oppDate 
                + " oppTime" + oppTime
                + " oppLocation" + oppLocation
                + " oppDistance" + oppDistance 
                + " orgSite" + orgSite
                + " orgp#" + orgPhoneNum);
            }
        }
    }
}





// JavaScript function to return users to the home screen
function goToHomeScreen() {
    window.location.href = "../home/home.html"; 
}
 


// ----- Initial Script Logic -----

txtBx.placeholder = "Volunteer Opportunities near " + zipCode;

