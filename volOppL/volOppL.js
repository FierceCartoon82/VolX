// variables
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);


// searchZip
function defineZipCode() {
    alert("WE HERE");
    let txtBx = document.getElementById("textBox");
    alert(txtBx.placeholder);
    txtBx.placeholder = "Volunteer Opportunities in" + zipCode;
    alert(txtBx.placeholder);

    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
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