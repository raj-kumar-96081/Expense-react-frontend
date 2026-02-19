function ExpenseSummary({ summary }) {
    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h5 className="fw-bold mb-3">Group Summary</h5>

                {Object.keys(summary).length === 0 ? (
                    <p className="text-muted">No balance data.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {Object.entries(summary).map(([userId, amount]) => (
                            <li
                                key={userId}
                                className="list-group-item d-flex justify-content-between"
                            >
                                <span>{userId}</span>
                                <span
                                    className={`fw-bold ${amount >= 0 ? "text-success" : "text-danger"
                                        }`}
                                >
                                    ₹{amount}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ExpenseSummary;