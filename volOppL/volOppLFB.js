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
let itemsArray = ['test'];

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
        console.log(itemsArray);
    } catch (error) {
        console.error(error);
    }
}

fetchData(); // Call the function to fetch and display data
