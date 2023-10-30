// ----- Variable Declarations -----
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", localStorage.getItem("zipCode")); // add parseint() if required
let zipCode = localStorage.getItem("zipCode");
txtBx.placeholder = "Donation Opportunities near " + zipCode;

// zipcode api code
const zcApiUrl = `https://app.zipcodebase.com/api/v1/radius?apikey=a960f3b0-76ba-11ee-828f-3fb09205c01b&code=${zipCode}&radius=40&country=us`;


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


// fetch from firebase
async function fetchData(apiZipCodes) {
    try {
        databaseArray = await getItemsFromFirestore();
        findInRangeEvents(apiZipCodes);
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
    console.log(data);
    fetchData(data); // Call the function to fetch and display data from Firebase (pass the ZipCode in the parameter)
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });

fetch(zcApiUrl);


// call function to run after data is fetched
let inRangeEvents = [];

function findInRangeEvents(data) {
    console.log("in range events function called");
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
            if (zipCode === volOppZipCode) {
                inRange = true;
                console.log(inRange);
            } else {
                // loop through each value in array
                for (let i = 0; i < data.results.length; i++) {
                    if (data.results[i].code === volOppZipCode) {
                        inRange = true;
                        distance = data.results[i].distance;
                        console.log(inRange + " " + distance);


                        break;
                    }
                }
            }


            // if the distance is under a certain amount then proceed
            if (inRange) {
                inRangeEvents.push(databaseArray[r]);

                console.log("inRange events: ");
                console.log(inRangeEvents)
                
            };
        }
                
                
    }
    // call function to display calendar
    //document.addEventListener("DOMContentLoaded", () => {
        console.log("calling function to display date after everythuijgn else")
        displayDate();
    //});
}
    



// function to toggle tabs
function viewTabToggle() {
    window.location.href = "../volOppL/volOppL.html";
}

// JavaScript function to return users to the home screen
function goToHomeScreen() {
    window.location.href = "../home/home.html"; 
}
 
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

// ----- Initial Script Logic -----

txtBx.placeholder = "Volunteer Opportunities near " + zipCode;



// JAVASCRIPT FOR CALENDAR VIEW
// javascript for calendar view

const currentDateEl = document.querySelector('.current-date');
const daysGridEl = document.querySelector('.days-grid');
const prevEl = document.getElementById('prev');
const nextEl = document.getElementById('next');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function displayDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    currentDateEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    let daysHTML = '';
    for (let emptyDays = 0; emptyDays < firstDay; emptyDays++) {
        daysHTML += '<span></span>';
    }

    for (let day = 1; day <= lastDay; day++) {
        const daySpan = document.createElement('span');
        let eventOnDay = false;
        

        // loop through all in range events
        for (let event = 0; event < inRangeEvents.length; event++) {
            // check if same year
            if (parseInt(inRangeEvents[event].date.slice(-2)) == currentYear % 100) { // % 100 to get the last two digits
                // check if first 2 digits of date (the month) is the same as currentMonth
                // essentially check if the event is in the same month
                if(parseInt(inRangeEvents[event].date.slice(0, 2)) == currentMonth + 1) {
                    // check if event is in the same day
                    if (parseInt(inRangeEvents[event].date.slice(3,5)) == day) {
                        eventOnDay = true;
                        console.log("event MATCH");
                        
                        // store all variables from database
                        let orgName = databaseArray[event].organizationName;
                        let oppDate = databaseArray[event].date;
                        let oppTime = databaseArray[event].time;
                        let oppLocation = databaseArray[event].location;
                        let orgSite = databaseArray[event].website;
                        let orgPhoneNum = databaseArray[event].phoneNum;
                        //let orgLogo = databaseArray[event].logo;


                        const cardContent = `
                            <!-- Content in Day -->
                            <div class="oppContent">
                                <h4 class="oppTitle"> <a href=${orgSite} target="_blank">${orgName}</a> </h4>
                                <p class="oppTime"> Time: ${oppTime}</p>
                                </a>
                            </div>
                        `;

                        daysHTML += `<span data-day="${day}"><br>${cardContent}</span>`;
                        
                    }
                }
            }
            
        }
        if (!eventOnDay) {
            daysHTML += `<span data-day="${day}"></span>`; 
        } 
    

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

//displayDate();