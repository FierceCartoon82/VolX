// variables
let txtBx = document.getElementById("textBox");
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);
txtBx.placeholder = "Volunteer Opportunities in " + zipCode;


// searchZip
function defineZipCode() {
    let txtBx = document.getElementById("textBox");
    zipCode = txtBx.value;
    localStorage.setItem('zipCode', zipCode);
    txtBx.placeholder = "Volunteer Opportunities in " + zipCode;
    txtBx.value = "";

}

// opportunty type tab toggle *CHANGE THE LINK*
function oppTabToggle() {
    localStorage.setItem('volOppTab', !localStorage.getItem("volOppTab"));
    window.location.href = "../donOpp/donOpp.html";
}

// view type tab toggle *CHANGE THE LINK*
function viewTabToggle() {
    localStorage.setItem('listView', !localStorage.getItem("listView"));
    window.location.href = "../volOppC/volOppC.html";
}



function toggleDropdown() {
    const dropdown = document.getElementById('filter-dropdown');
    if (dropdown) {
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }
}