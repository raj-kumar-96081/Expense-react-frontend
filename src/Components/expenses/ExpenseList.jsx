

function ExpenseList({ expenses }) {
    if (!expenses || !Array.isArray(expenses)) {
        return (
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">Transactions</h5>
                    <p className="text-muted">Loading expenses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h5 className="fw-bold mb-3">Transactions</h5>

                {expenses.length === 0 ? (
                    <p className="text-muted">No expenses yet.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {expenses.map((expense) => (
                            <li
                                key={expense._id}
                                className="list-group-item d-flex justify-content-between"
                            >
                                <span>{expense.description}</span>
                                <span className="fw-bold text-primary">
                                    ₹{expense.amount}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ExpenseList;