// variables
let zipCode = localStorage.getItem("zipCode");
localStorage.setItem("listView", true);

window.onload = function () {
  const monthHeading = document.getElementById("month-heading");
  const calendarBody = document.getElementById('calendar-body');
  const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentMonth = months[month];
  const currentYear = year;

  monthHeading.textContent = `${currentMonth} ${currentYear}`;

  calendarBody.innerHTML = ''; // Clear previous content

  let day = 1;

  for (let i = 0; i < 6; i++) { // Assuming a maximum of 6 rows in the calendar
      const row = document.createElement('tr');
      let emptyRow = true; // Flag to check if the row is empty

      for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');
          const numberSpan = document.createElement('span');
          numberSpan.classList.add('number');

          if ((i === 0 && j < firstDay) || day > daysInMonth) {
              // Add an empty cell if before the first day or after the last day
              cell.classList.add('empty-cell');
          } else {
              numberSpan.textContent = day;
              day++;
              emptyRow = false; // Mark the row as non-empty
          }

          cell.appendChild(numberSpan);
          row.appendChild(cell);
      }

      if (!emptyRow) {
          // Only append non-empty rows to the calendar
          calendarBody.appendChild(row);
      }

      // Exit the loop if all days are added to the calendar
      if (day > daysInMonth) {
          break;
      }
  }
};
    

function defineZipCode() {
    zipCode = document.getElementById("textBox").value;
    localStorage.setItem('zipCode', zipCode);
}

// view type tab toggle *CHANGE THE LINK*
function viewTabToggle() {
    localStorage.setItem('listView', !localStorage.getItem("listView"));
    window.location.href = "../volOppL/volOppL.html";
}
