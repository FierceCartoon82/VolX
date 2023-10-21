// variables
let volOppTab = true;
let zipCode = "00000";

function defineZipCode() {
    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
    alert(zipCode);
}

// route to next page
function nextPg() {
    // store text from textbox
    defineZipCode();

    // reroute to volOppList view
    window.location.href = "../volOppL/volOppL.html"
}



/*
COME BACK TO THIS LATER!!!
Ensure that the numbers entered were a valid zip code

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


//THIS IS HOW TO RETRIEVE THE VARIABLE FOR REFERENCE
// Retrieving a boolean value from local storage
//const storedValue = localStorage.getItem('myBoolean');
//const retrievedBoolean = JSON.parse(storedValue);