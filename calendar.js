// ==== Calendar Setup ====
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// global variable for selected date
let selectedDate = formatDate(today);

const monthYearEl = document.getElementById("monthYear");
const calendarGridEl = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// ==== Utility to format date as YYYY-MM-DD ====
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ==== Render Calendar ====
function renderCalendar(month, year) {
  // Remove previous days/dates
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

    const fullDate = `${year}-${String(month + 1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;

    // Highlight today
    if (fullDate === formatDate(today)) dateEl.classList.add("today");

    // Highlight selected date
    if (fullDate === selectedDate) dateEl.classList.add("selected");

    // Click to select date
    dateEl.addEventListener("click", () => {
      selectedDate = fullDate;
      renderCalendar(currentMonth, currentYear);

      // Dispatch custom event for To-Do List
      const event = new CustomEvent("dateChanged", { detail: selectedDate });
      document.dispatchEvent(event);
    });

    calendarGridEl.appendChild(dateEl);
  }
}

// ==== Calendar Navigation ====
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

// ==== Initial render ====
renderCalendar(currentMonth, currentYear);
