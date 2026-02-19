import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    getGroupExpenses,
    getGroupSummary,
} from "../service/expenseApi";

import { getGroupById } from "../service/groupApi";   // ✅ FIXED

import AddExpenseForm from "../components/expenses/AddExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseSummary from "../components/expenses/ExpenseSummary";
import SettleGroupButton from "../components/expenses/SettleGroupButton";

function GroupExpenses() {
    const { groupId } = useParams();

    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({});
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);

            const [expensesRes, summaryRes, groupRes] =
                await Promise.all([
                    getGroupExpenses(groupId),
                    getGroupSummary(groupId),
                    getGroupById(groupId),
                ]);

            setExpenses(
                Array.isArray(expensesRes.data)
                    ? expensesRes.data
                    : []
            );

            setSummary(summaryRes.data || {});
            setGroupDetails(groupRes.data || null);
            console.log("GROUP RESPONSE:", groupRes.data);

        } catch (error) {
            console.error("Error loading group expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (groupId) loadData();
    }, [groupId]);

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard">Groups</Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Expense Details
                    </li>
                </ol>
            </nav>

            <div className="bg-white p-4 rounded-4 shadow-sm border">
                <div className="text-center mb-4">
                    <i className="bi bi-wallet2 display-5 text-primary opacity-50"></i>

                    <h3 className="fw-bold mt-2">
                        {groupDetails?.name || "Group Expense Manager"}
                    </h3>

                    <p className="text-muted small">
                        Group ID: <code>{groupId}</code>
                    </p>
                </div>

                <hr />

                {loading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" />
                    </div>
                ) : (
                    <>
                        <AddExpenseForm
                            groupId={groupId}
                            membersEmail={groupDetails?.membersEmail || []}
                            onSuccess={loadData}
                        />

                        <ExpenseList expenses={expenses} />

                        <ExpenseSummary summary={summary} />

                        <SettleGroupButton
                            groupId={groupId}
                            onSuccess={loadData}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default GroupExpenses;





// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import {
//     getGroupExpenses,
//     getGroupSummary,
// } from "../service/expenseApi";

// // import { getGroupById } from "../service/groupApi";

// import AddExpenseForm from "../components/expenses/AddExpenseForm";
// import ExpenseList from "../components/expenses/ExpenseList";
// import ExpenseSummary from "../components/expenses/ExpenseSummary";
// import SettleGroupButton from "../components/expenses/SettleGroupButton";

// function GroupExpenses() {
//     const { groupId } = useParams();

//     const [expenses, setExpenses] = useState([]);
//     const [summary, setSummary] = useState({});
//     const [groupDetails, setGroupDetails] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const loadData = async () => {
//         try {
//             setLoading(true);

//             const [expensesRes, summaryRes, groupRes] =
//                 await Promise.all([
//                     getGroupExpenses(groupId),
//                     getGroupSummary(groupId),
//                     getGroupById(groupId),
//                 ]);

//             // ✅ Expenses (must be array)
//             setExpenses(
//                 Array.isArray(expensesRes.data)
//                     ? expensesRes.data
//                     : []
//             );

//             // ✅ Summary (object)
//             setSummary(summaryRes.data || {});

//             // ✅ Group Details (raw object from your API)
//             setGroupDetails(groupRes.data || null);

//         } catch (error) {
//             console.error("Error loading group expenses:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (groupId) loadData();
//     }, [groupId]);

//     return (
//         <div className="container py-5">
//             {/* ✅ Breadcrumb */}
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                         <Link to="/dashboard">Groups</Link>
//                     </li>
//                     <li className="breadcrumb-item active">
//                         Expense Details
//                     </li>
//                 </ol>
//             </nav>

//             <div className="bg-white p-4 rounded-4 shadow-sm border">
//                 {/* ✅ Header */}
//                 <div className="text-center mb-4">
//                     <i className="bi bi-wallet2 display-5 text-primary opacity-50"></i>

//                     <h3 className="fw-bold mt-2">
//                         {groupDetails?.name || "Group Expense Manager"}
//                     </h3>

//                     <p className="text-muted small">
//                         Group ID:{" "}
//                         <code>{groupId}</code>
//                     </p>
//                 </div>

//                 <hr />

//                 {/* ✅ Loading State */}
//                 {loading ? (
//                     <div className="text-center py-4">
//                         <div className="spinner-border text-primary" />
//                     </div>
//                 ) : (
//                     <>
//                         {/* ✅ Add Expense Form */}
//                         <AddExpenseForm
//                             groupId={groupId}
//                             membersEmail={groupDetails?.membersEmail || []}
//                             onSuccess={loadData}
//                         />

//                         {/* ✅ Expense List */}
//                         <ExpenseList expenses={expenses} />

//                         {/* ✅ Expense Summary */}
//                         <ExpenseSummary summary={summary} />

//                         {/* ✅ Settle Button */}
//                         <SettleGroupButton
//                             groupId={groupId}
//                             onSuccess={loadData}
//                         />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default GroupExpenses;