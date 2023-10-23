// variables
let txtBx = document.getElementById("textBox");
localStorage.setItem("zipCode", parseInt(localStorage.getItem("zipCode")));
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", false);
txtBx.placeholder = "Donation Opportunities near " + zipCode;


// searchZip
function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', parseInt(zipCode));
    txtBx.placeholder = "Donation Opportunities near " + zipCode;
    txtBx.value = "";

}

// opportunty type tab toggle *CHANGE THE LINK*
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../volOppL/volOppL.html";
}

function goToHomeScreen() {
    window.location.href = "../home/home.html"; 
}
