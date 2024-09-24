document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseIdInput = document.getElementById('expense-id');
    const expenseNameInput = document.getElementById('name');
    const expenseAmountInput = document.getElementById('amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.dataset.id = expense.id;
            li.innerHTML = `
                <span>${expense.name} - $${expense.amount}</span>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    function addExpense(expense) {
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function updateExpense(updatedExpense) {
        expenses = expenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = expenseIdInput.value;
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;

        if (id) {
            updateExpense({ id, name, amount });
        } else {
            addExpense({ id: Date.now().toString(), name, amount });
        }

        expenseForm.reset();
        expenseIdInput.value = '';
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const li = e.target.closest('li');
            const id = li.dataset.id;
            const expense = expenses.find(expense => expense.id === id);

            expenseIdInput.value = expense.id;
            expenseNameInput.value = expense.name;
            expenseAmountInput.value = expense.amount;
        }

        if (e.target.classList.contains('delete')) {
            const li = e.target.closest('li');
            const id = li.dataset.id;
            deleteExpense(id);
        }
    });

    renderExpenses();
}); 