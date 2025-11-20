// ==== To-Do List Setup ====
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let currentDate = window.selectedDate || new Date().toISOString().split('T')[0];

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Update tasks when date changes
document.addEventListener("dateChanged", (e) => {
  currentDate = e.detail;
  renderTodoList();
});

function renderTodoList() {
  todoList.innerHTML = "";
  const dateTasks = tasks[currentDate] || [];
  dateTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("todoDeleteBtn");
    delBtn.addEventListener("click", () => {
      dateTasks.splice(index, 1);
      tasks[currentDate] = dateTasks;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTodoList();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// Add task
addTodoBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (!task) return;

  if (!tasks[currentDate]) tasks[currentDate] = [];
  tasks[currentDate].push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  todoInput.value = "";
  renderTodoList();
});

// Enter key
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodoBtn.click();
});

// Initial render
renderTodoList();
