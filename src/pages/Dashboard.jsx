
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyGroupsDash } from "../service/groupApi";
import { getRecentExpenses } from "../service/expenseApi";
import { getGroupSummary } from "../service/expenseApi";

function Dashboard() {
    const user = useSelector((state) => state.userDetails);

    const [groups, setGroups] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalBalance, setTotalBalance] = useState(0);
    const [youOwe, setYouOwe] = useState(0);
    const [youAreOwed, setYouAreOwed] = useState(0);


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [groupsRes, expensesRes] = await Promise.all([
                    getMyGroupsDash(1, 5),
                    getRecentExpenses(),
                ]);

                console.log("Groups:", groupsRes.data);
                console.log("Expenses:", expensesRes.data);
                const groupsData = groupsRes.data.groups || [];
                setGroups(groupsRes.data.groups || []);
                setExpenses(expensesRes.data || []);

                let total = 0;
                let owe = 0;
                let owed = 0;

                for (const group of groupsData) {
                    const summaryRes = await getGroupSummary(group._id);
                    const summary = summaryRes.data;

                    const userBalance = summary[user.email] || 0;

                    total += userBalance;

                    if (userBalance < 0) {
                        owe += Math.abs(userBalance);
                    } else {
                        owed += userBalance;
                    }
                }

                setTotalBalance(total);
                setYouOwe(owe);
                setYouAreOwed(owed);



            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="bg-light min-vh-100">

            <div className="container py-4">

                {/* Welcome Section (Same vibe as Home hero) */}
                <div className="p-4 p-md-5 mb-4 bg-white rounded-4 shadow-sm">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-bold">
                                Dashboard Overview
                            </span>
                            <h2 className="fw-bold">
                                Welcome back, {user?.name || "User"} 👋
                            </h2>
                            <p className="text-muted mb-0">
                                Here’s what’s happening with your expenses and groups.
                            </p>
                        </div>
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <Link
                                to="/groups"
                                className="btn btn-primary rounded-pill px-4 shadow-sm"
                            >
                                + Add Expense
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <small className="text-muted">Total Balance</small>
                            <h3
                                className={`fw-bold mb-0 ${totalBalance >= 0
                                    ? "text-success"
                                    : "text-danger"
                                    }`}
                            >
                                ₹{totalBalance.toFixed(2)}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <small className="text-muted">You Owe</small>
                            <h3 className="fw-bold text-danger mb-0">
                                ₹{youOwe.toFixed(2)}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <small className="text-muted">You Are Owed</small>
                            <h3 className="fw-bold text-primary mb-0">
                                ₹{youAreOwed.toFixed(2)}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="container py-4">
                        <div className="row g-4">

                            {/* Recent Expenses */}
                            <div className="col-lg-7">
                                <div className="card shadow-sm border-0 rounded-4">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="fw-bold">
                                                Recent Expenses
                                            </h5>
                                            <Link to="/groups">View All</Link>
                                        </div>

                                        {expenses.length === 0 ? (
                                            <p className="text-muted">
                                                No recent expenses
                                            </p>
                                        ) : (
                                            expenses.map((expense) => {
                                                const isPayer =
                                                    expense.paidByEmail === user.email;

                                                return (
                                                    <div
                                                        key={expense._id}
                                                        className="border rounded-3 p-3 mb-3 bg-light"
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <strong>
                                                                {expense.description}
                                                            </strong>

                                                            <span
                                                                className={
                                                                    isPayer
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                                }
                                                            >
                                                                {isPayer ? "+" : "-"}₹
                                                                {expense.amount}
                                                            </span>
                                                        </div>

                                                        <small className="text-muted">
                                                            {expense.groupId?.name}
                                                        </small>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Groups */}
                            <div className="col-lg-5">
                                <div className="card shadow-sm border-0 rounded-4">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="fw-bold">
                                                Your Groups
                                            </h5>
                                            <Link to="/groups">Manage</Link>
                                        </div>

                                        {groups.length === 0 ? (
                                            <p className="text-muted">
                                                No groups yet
                                            </p>
                                        ) : (
                                            groups.map((group, index) => (
                                                <div
                                                    key={group._id}
                                                    className={`p-3 rounded-3 mb-3 ${index % 2 === 0
                                                        ? "bg-primary bg-opacity-10"
                                                        : "bg-success bg-opacity-10"
                                                        }`}
                                                >
                                                    <strong>{group.name}</strong>
                                                    <div className="text-muted small">
                                                        {group.membersEmail.length} members
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bottom CTA (Matches HomePage style) */}
                <div className="mt-5 p-4 bg-primary text-white rounded-5 shadow-lg text-center">
                    <h4 className="fw-bold">
                        Stay on top of your finances 💡
                    </h4>
                    <p className="mb-3 opacity-75">
                        Track expenses, settle balances, and manage groups effortlessly.
                    </p>
                    <Link
                        to="/groups"
                        className="btn btn-light rounded-pill px-4 fw-bold"
                    >
                        View My Groups
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;