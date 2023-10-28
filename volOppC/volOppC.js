// variables
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);

// CALENDAR VIEW:
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function createCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    document.querySelector(".calendar-header h1").innerText = monthNames[month];
    document.querySelector(".calendar-header p").innerText = year;

    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    
    let calendarHtml = daysOfWeek.map(day => `<div class="day day-name">${day}</div>`).join("");

    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarHtml += '<div class="day"></div>';
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        let dayClass = "day";
        if (i === now.getDate()) {
            dayClass += " today";
        }
        calendarHtml += `<div class="${dayClass}"><span class="day-body">${i}</span></div>`;
    }

    document.querySelector(".calendar").innerHTML = calendarHtml;
}

window.onload = function() {
    createCalendar();
};

function handleEnterKeyPress(event) {
    if (event.keyCode === 13) { //Enter key
        defineZipCode();
    }
}

function defineZipCode() {
    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
}

// view type tab toggle *CHANGE THE LINK*
function viewTabToggle() {
    localStorage.setItem('listView', !localStorage.getItem("listView"));
    window.location.href = "../volOppL/volOppL.html";
}
