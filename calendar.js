const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthYearEl = document.getElementById("monthYear");
const calendarGridEl = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

function renderCalendar(month, year) {
  // Remove previous days/dates (keep header)
  calendarGridEl.querySelectorAll(".day, .date, .empty").forEach(el => el.remove());

  // Set header
  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  // Days of the week
  dayNames.forEach(day => {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;
    calendarGridEl.appendChild(dayEl);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty slots for first week
  for (let i = 0; i < firstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.classList.add("empty");
    calendarGridEl.appendChild(emptyEl);
  }

  // Dates
  for (let date = 1; date <= daysInMonth; date++) {
    const dateEl = document.createElement("div");
    dateEl.classList.add("date");
    dateEl.textContent = date;

    // Highlight today
    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dateEl.classList.add("today");
    }

    calendarGridEl.appendChild(dateEl);
  }
}

// Navigation buttons
prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Initial render
renderCalendar(currentMonth, currentYear);
