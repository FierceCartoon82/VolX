// variables
let volOppTab = true;
let zipCode = "00000";

function defineZipCode() {
    zipCode = document.getElementById("textBox").value.trim();
    localStorage.setItem('zipCode', zipCode);
}

// route to next page
function nextPg() {
    defineZipCode();
    //alert the user if they do not enter a valid zipCode
    if (!isProbablyValidUSZipCode(zipCode)) {
        alert("Please enter a valid ZIP code.");
        return; // stops the function from proceeding to the redirection
    }

    // store text from textbox
    defineZipCode();

    // reroute to volOppList view
    window.location.href = "../volOppL/volOppL.html"
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

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        nextPg();
    }
}






//THIS IS HOW TO RETRIEVE THE VARIABLE FOR REFERENCE
// Retrieving a boolean value from local storage
//const storedValue = localStorage.getItem('myBoolean');
//const retrievedBoolean = JSON.parse(storedValue);