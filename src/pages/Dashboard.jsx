// import { useSelector } from 'react-redux';

// function Dashboard(){
//      const user = useSelector((state) => state.userDetails);
//     return(
//         <div className="container text-center">
//             <h2>Welcome, {user.name} To Expense App Your Expense Friend</h2>
//         </div>
//     );
// }
// export default Dashboard;


import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import UserHeader from "../components/UserHeader";

function Dashboard() {
    const user = useSelector((state) => state.userDetails);

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
                                to="/add-expense"
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
                            <h3 className="fw-bold text-success mb-0">
                                ₹12,450
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <small className="text-muted">You Owe</small>
                            <h3 className="fw-bold text-danger mb-0">
                                ₹1,820
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <small className="text-muted">You Are Owed</small>
                            <h3 className="fw-bold text-primary mb-0">
                                ₹2,100
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row g-4">

                    {/* Recent Expenses */}
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">Recent Expenses</h5>
                                    <Link to="/expenses" className="text-decoration-none small">
                                        View All
                                    </Link>
                                </div>

                                <div className="border rounded-3 p-3 mb-3 bg-light">
                                    <div className="d-flex justify-content-between">
                                        <strong>Goa Trip Dinner</strong>
                                        <span className="text-danger">-₹850</span>
                                    </div>
                                    <small className="text-muted">
                                        Split between 4 members
                                    </small>
                                </div>

                                <div className="border rounded-3 p-3 mb-3 bg-light">
                                    <div className="d-flex justify-content-between">
                                        <strong>Uber Ride</strong>
                                        <span className="text-danger">-₹320</span>
                                    </div>
                                    <small className="text-muted">
                                        Personal Expense
                                    </small>
                                </div>

                                <div className="border rounded-3 p-3 bg-light">
                                    <div className="d-flex justify-content-between">
                                        <strong>Flat Electricity Bill</strong>
                                        <span className="text-danger">-₹1,200</span>
                                    </div>
                                    <small className="text-muted">
                                        Flat Expenses Group
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Groups Section */}
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">Your Groups</h5>
                                    <Link to="/groups" className="text-decoration-none small">
                                        Manage
                                    </Link>
                                </div>

                                <div className="p-3 rounded-3 bg-primary bg-opacity-10 mb-3">
                                    <strong>Goa Trip</strong>
                                    <div className="text-muted small">
                                        4 members • ₹3,200 total
                                    </div>
                                </div>

                                <div className="p-3 rounded-3 bg-success bg-opacity-10">
                                    <strong>Flat Expenses</strong>
                                    <div className="text-muted small">
                                        3 members • ₹5,450 total
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