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

// filters variable storage
let volOppTab = true;
let zipCode = "00000";

function toggleOpp() {
    volOppTab = !volOppTab;
    localStorage.setItem('volOppTab', volOppTab);
}

function defineZipCode() {
    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
}

/*
COME BACK TO THIS LATER!!!

function isProbablyValidUSZipCode(zip) {
    let patterns = ["#####", "#####-####", "##### ####", "#########"];
    for (let i = 0; i < patterns.length; i++) {
        if (checkAgainstPattern(zip, patterns[i])) {
            return true;
        }
    }
    return false;
}


function checkAgainstPattern(zipString, pattern) {
    if (zipString.length !== pattern.length) {
        return false;
    }

    for (let i = 0; i < pattern.length; i++) {
        let c = zipString.charAt(i);
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

*/


function checkBoolean(){
   // if (isDigit(zipCode) && checkAgainstPattern(zipCode) && isProbablyValidUSZipCode(zipCode)) {
    if(volOppTab){
        window.location.href = "../volOppL/volOppL.html"
    }
   
    else {
        window.location.href = "../donOpp/donOpp.html"
    }
 

}


//THIS IS HOW TO RETRIEVE THE VARIABLE FOR REFERENCE
// Retrieving a boolean value from local storage
//const storedValue = localStorage.getItem('myBoolean');
//const retrievedBoolean = JSON.parse(storedValue);