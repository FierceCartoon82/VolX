// variables
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", localStorage.getItem("zipCode")); // add parseint() if required
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", false);
txtBx.placeholder = "Donation Opportunities near " + zipCode;



// searchZip
function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', zipCode); // add parseint() if required
    txtBx.placeholder = "Donation Opportunities near " + zipCode;
    txtBx.value = "";

    // reload from database
    displayVolOpp(zipCodeArray);
}

// opportunty type tab toggle *CHANGE THE LINK*
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../volOppL/volOppL.html";
}

function goToHomeScreen() {
    window.location.href = "../home/home.html"; 
}



// PARTNERS CONTENT
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
const zcApiUrl = `https://app.zipcodebase.com/api/v1/radius?apikey=321891d0-745c-11ee-983d-014c610a2320&code=${zipCode}&radius=40&country=us`;

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


//fetchData(); // Call the function to fetch and display data


// call function to run after data is fetched

function displayVolOpp(data) {
    console.log(data);
    console.log(data.results);
    // go through every row in database
    for (let r = 0; r < itemsArray.length; r++) {
        // check if row is donation opportunities
        // (if first letter of V/D is 'd' then confirm)
        if (itemsArray[r].V_or_D.charAt(0).toLowerCase() === 'd') {
            // get last 5 digits of address (for the ZipCode)
            // first convert the digits to integer
            console.log("yes it is donation2");
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
                console.log("cp1");
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
                let orgName = itemsArray[r].organizationName;
                let moneyNeeded = itemsArray[r].dolAmnt;
                let itemsNeeded = itemsArray[r].items;
                let orgSite = itemsArray[r].website;
                let orgPhoneNum = itemsArray[r].phoneNum;
                let oppLocation = itemsArray[r].location;


                console.log("orgName" + orgName +
                " money needed" + moneyNeeded 
                + " items needed" + itemsNeeded
                + " oppLocation" + oppLocation
                + " oppDistance" + distance 
                + " orgSite" + orgSite
                + " orgp#" + orgPhoneNum);
                
                

                // Create a new row at the end of the table body
                const dataTable = document.getElementById("data-table");
                const newRow1 = dataTable.insertRow(-1);
                newRow1.classList.add("first-row"); // Add a class to the first row

                const newRow2 = dataTable.insertRow(-1);
                const newRow3 = dataTable.insertRow(-1);
                const newRow4 = dataTable.insertRow(-1);
                const newRow5 = dataTable.insertRow(-1);


                

                // Create and populate cells for each variable and its value using .innerHTML
                newRow1.insertCell(0).innerHTML =  orgName;
                newRow2.insertCell(0).innerHTML = "Distance: " + oppDistance + "      Date: " + oppDate; 
                newRow3.insertCell(0).innerHTML = "Time: " + oppTime;
                newRow4.insertCell(0).innerHTML = "Location: " + oppLocation;
                newRow5.insertCell(0).innerHTML = "Phone #: " + orgPhoneNum;
                


                // second row
                
                
                

            }
        }
    }
}



