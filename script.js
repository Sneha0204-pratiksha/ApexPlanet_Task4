// 🧩 Typewriter Effect
const text = "Hi, I'm Sneha — Web Developer.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = () => {
  if (document.getElementById("typewriter")) typeWriter();
  if (document.getElementById("taskList")) loadTasks();
  if (document.getElementById("filter")) updateDisplay();
};

// 🌐 Smooth Scroll
function scrollToProjects() {
  window.location.href = "projects.html";
}

// 📨 Form Validation
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();
    const response = document.getElementById("responseMsg");

    if (!name || !email || !msg) {
      response.textContent = "❌ Please fill all fields.";
      response.style.color = "red";
    } else if (!email.includes("@")) {
      response.textContent = "⚠️ Invalid email address.";
      response.style.color = "orange";
    } else {
      response.textContent = "✅ Message sent successfully!";
      response.style.color = "green";
      form.reset();
    }
  });
}

// ✅ To-Do List with Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t;
    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = () => deleteTask(i);
    li.appendChild(del);
    list.appendChild(li);
  });
}
function addTask() {
  const task = document.getElementById("taskInput").value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("taskInput").value = "";
    loadTasks();
  }
}
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
const addTaskBtn = document.getElementById("addTask");
if (addTaskBtn) addTaskBtn.addEventListener("click", addTask);

// 🛍️ Product Filter + Sort
const products = [
  { name: "Phone", category: "electronics", price: 500 },
  { name: "Laptop", category: "electronics", price: 900 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Shoes", category: "clothing", price: 60 }
];

function updateDisplay() {
  const container = document.getElementById("productContainer");
  if (!container) return;
  const filter = document.getElementById("filter").value;
  const sort = document.getElementById("sort").value;

  let list = products.filter(p => filter === "all" || p.category === filter);
  list.sort((a,b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${p.name}</h3><p>${p.category}</p><p>₹${p.price}</p>`;
    container.appendChild(div);
  });
}
