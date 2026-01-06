// AUTH CHECK
if (!localStorage.getItem("auth")) {
  window.location = "index.html";
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;
let chart;

/* ADD NEW EXPENSE */
function addExpense() {
  const expense = {
    category: category.value,
    amount: amount.value,
    comment: comment.value,
    created: new Date().toLocaleString(),
    updated: new Date().toLocaleString()
  };

  expenses.unshift(expense);
  saveAndRender();
  clearInputs();
}

/* LOAD DATA FOR EDIT */
function editExpense(index) {
  const e = expenses[index];
  category.value = e.category;
  amount.value = e.amount;
  comment.value = e.comment;

  editIndex = index;

  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline-block";
}

/* UPDATE EXISTING EXPENSE */
function updateExpense() {
  if (editIndex === null) return;

  expenses[editIndex].category = category.value;
  expenses[editIndex].amount = amount.value;
  expenses[editIndex].comment = comment.value;
  expenses[editIndex].updated = new Date().toLocaleString();

  editIndex = null;

  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";

  saveAndRender();
  clearInputs();
}

/* DELETE */
function deleteExpense(index) {
  if (confirm("Delete this expense?")) {
    expenses.splice(index, 1);
    saveAndRender();
  }
}

/* SAVE + RENDER */
function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

/* UI RENDER */
function render() {
  expenseTable.innerHTML = "";
  let categoryData = {};

  expenses.forEach((e, i) => {
    expenseTable.innerHTML += `
      <tr>
        <td>${e.category}</td>
        <td>${e.amount}</td>
        <td>${e.created}</td>
        <td>${e.updated}</td>
        <td>${e.comment || "-"}</td>
        <td>
          <button class="edit-btn" onclick="editExpense(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteExpense(${i})">Delete</button>
        </td>
      </tr>
    `;

    categoryData[e.category] =
      (categoryData[e.category] || 0) + Number(e.amount);
  });

  drawChart(categoryData);
}

/* CLEAR FORM */
function clearInputs() {
  category.value = "";
  amount.value = "";
  comment.value = "";
}

/* PIE CHART */
function drawChart(data) {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#667eea",
          "#764ba2",
          "#f0ad4e",
          "#5cb85c",
          "#d9534f"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // 🔥 FIX FOR BIG CHART
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

/* INITIAL LOAD */
render();
