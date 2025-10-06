const input = document.getElementById("taskinput");
const addBtn = document.getElementById("addBtn");
const tasklist = document.getElementById("tasklist");

// --- ذخیره تسک‌ها در localStorage ---
function saveTasks() {
  let tasks = [];
  document.querySelectorAll('#tasklist li').forEach(li => {
    let taskText = li.querySelector('.task-text').textContent;
    let done = li.classList.contains('done');
    tasks.push({ text: taskText, done: done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- بارگذاری تسک‌ها از localStorage ---
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTask(task.text, task.done);
  });
}

// --- تابع ساخت تسک ---
function createTask(taskText, done = false) {
  let li = document.createElement("li");
  li.className = "task-item";

  // متن تسک
  let span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  // چک باکس
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = done;

  // دکمه حذف
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖️";
  deleteBtn.className = "deleteBtn";
  // دکمه ویرایش
  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";

  let editIcon = document.createElement("img");
  editIcon.src = "images/edit.png";
  editIcon.alt = "edit";
  editIcon.className = "edit-icon";

editBtn.appendChild(editIcon)
  // کانتینر برای دکمه‌ها سمت راست
  let actions = document.createElement("div");
  actions.className = "task-actions";
  actions.appendChild(editBtn)
  actions.appendChild(checkbox);
  actions.appendChild(deleteBtn);

  //رویداد ادیت تسک ها 
  editBtn.addEventListener("click", function(){
    input.value = span.textContent;
    li.remove();
    saveTasks();
  })

  // رویداد چک باکس
  checkbox.addEventListener("change", function () {
    li.classList.toggle("done", checkbox.checked);
    saveTasks();
  });

  // رویداد حذف
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  if (done) li.classList.add("done");

  li.appendChild(span);
  li.appendChild(actions);
  tasklist.appendChild(li);

  saveTasks(); // هر بار که تسک ساخته میشه ذخیره کن
}

// --- افزودن تسک جدید ---
function addTask() {
  let taskText = input.value.trim();
  if (taskText === "") {
    alert("add your task");
    return;
  }
  createTask(taskText);
  input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// بارگذاری تسک‌ها موقع شروع
loadTasks();

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(() => {
    console.log("Service Worker registered!");
  });
}
const themeToggle = document.getElementById("themeToggle");

// بررسی حالت ذخیره‌شده قبلی
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "Dark Mode";
  }
});



