// variables
let txtBx = document.getElementById("textBox");
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", false);
txtBx.placeholder = "Donation Opportunities near ";


// searchZip
function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', zipCode);
    txtBx.placeholder = "Donation Opportunities near " + zipCode;
    txtBx.value = "";

}

// opportunty type tab toggle *CHANGE THE LINK*
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../volOppL/volOppL.html";
}


