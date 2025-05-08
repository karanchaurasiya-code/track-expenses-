let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseTableBody.innerHTML = ""; // Clear table
  totalAmount = 0;

  expenses.forEach((expense, index) => {
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      expenses.splice(index, 1);
      updateLocalStorage();
      renderExpenses();
    });

    deleteCell.appendChild(deleteBtn);

    totalAmount += expense.amount;
  });

  totalAmountCell.textContent = totalAmount;
}

// Handle Add
addBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!category) return alert("Please select a category.");
  if (isNaN(amount) || amount <= 0) return alert("Please enter a valid amount.");
  if (!date) return alert("Please select a date.");

  const newExpense = { category, amount, date };
  expenses.push(newExpense);
  updateLocalStorage();
  renderExpenses();

  // ✅ Clear inputs
  amountInput.value = "";
  dateInput.value = "";
  categorySelect.selectedIndex = 0;
});

// 🔁 On page load
renderExpenses();
