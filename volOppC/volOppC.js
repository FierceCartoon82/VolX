// ----- Variable Declarations -----
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", localStorage.getItem("zipCode")); // add parseint() if required
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);
txtBx.placeholder = "Donation Opportunities near " + zipCode;

// zipcode api code
//const zcApiUrl = `https://app.zipcodebase.com/api/v1/radius?apikey=321891d0-745c-11ee-983d-014c610a2320&code=${zipCode}&radius=40&country=us`;


function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', zipCode); // add parseint() if required
    txtBx.placeholder = "Donation Opportunities near " + zipCode;
    txtBx.value = "";

    // reload from database
    fetch(zcApiUrl);
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
let databaseArray = [];

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
        databaseArray = await getItemsFromFirestore();
        displayVolOpp(apiZipCodes);
    } catch (error) {
        console.error(error);
    }
}

// USE ZIPCODE BASE TO RETURN LIST OF ZIPCODES WITHIN A DISTANCE OF 25 MILES
// construct API url


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

    console.log("ZIPCODE RADIUS JUST FETCHED")
    console.log(data)
    fetchData(data); // Call the function to fetch and display data from Firebase (pass the ZipCode in the parameter)
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });


//fetchData(); // Call the function to fetch and display data


// call function to run after data is fetched

function displayVolOpp(data) {
    console.log(data);
    console.log(data.results);
    // go through every row in database
    for (let r = 0; r < databaseArray.length; r++) {
        // check if row is volunteer opportunities
        // (if first letter of V/D is 'v' then confirm)
        if (databaseArray[r].V_or_D.charAt(0).toLowerCase() === 'v') {
            // get last 5 digits of address (for the ZipCode)
            // first convert the digits to integer
            console.log("yes it is volunteer");
            console.log(databaseArray[r]);
            let volOppZipCode = databaseArray[r].location.slice(-5);
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
                console.log("cp1");
                console.log(data);
                for (let i = 0; i < data.results.length; i++) {
                    console.log(data.results[i]);
                    if (data.results[i].code === volOppZipCode) {
                        console.log("cp2");
                        inRange = true;
                        distance = data.results[i].distance;
                        console.log(inRange + " " + distance);

                        break;
                    }
                }
            }


            // if the distance is under a certain amount then proceed
            if (inRange) {
                let orgName = databaseArray[r].organizationName;
                let oppDate = databaseArray[r].date;
                let oppTime = databaseArray[r].time;
                let oppLocation = databaseArray[r].location;
                let oppDistance = distance;
                let orgSite = databaseArray[r].website;
                let orgPhoneNum = databaseArray[r].phoneNum;
                let orgLogo = databaseArray[r].logo;


                console.log("orgName" + orgName +
                " oppDate" + oppDate 
                + " oppTime" + oppTime
                + " oppLocation" + oppLocation
                + " oppDistance" + oppDistance 
                + " orgSite" + orgSite
                + " orgp#" + orgPhoneNum);

                
                // add variables to calendar

            }
        }
    
// view type tab toggle *CHANGE THE LINK*
function viewTabToggle() {
    localStorage.setItem('listView', !localStorage.getItem("listView"));
    window.location.href = "../volOppL/volOppL.html";
}

    }
}

const currentDateEl = document.querySelector('.current-date');
const daysGridEl = document.querySelector('.days-grid');
const prevEl = document.getElementById('prev');
const nextEl = document.getElementById('next');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const displayDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    currentDateEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    let daysHTML = '';
    for (let emptyDays = 0; emptyDays < firstDay; emptyDays++) {
        daysHTML += '<span></span>';
    }

    for (let day = 1; day <= lastDay; day++) {
        daysHTML += `<span data-day="${day}"></span>`;
    }

    daysGridEl.innerHTML = daysHTML;
}

prevEl.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayDate();
});

nextEl.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayDate();
});

displayDate();


