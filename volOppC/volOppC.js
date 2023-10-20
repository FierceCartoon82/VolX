// variables
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);



// view type tab toggle *CHANGE THE LINK*
function viewTabToggle() {
    localStorage.setItem('listView', !localStorage.getItem("listView"));
    window.location.href = "../volOppL/volOppL.html";
}

function defineZipCode() {
    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
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