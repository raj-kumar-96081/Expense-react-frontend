import { useState, useEffect } from "react";
import { addExpense } from "../../service/expenseApi";

function AddExpenseForm({ groupId, membersEmail = [], onSuccess }) {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
    });

    const [splitType, setSplitType] = useState("equal");
    const [splits, setSplits] = useState([]);

    // ✅ Initialize splits when members load
    useEffect(() => {
        if (membersEmail.length) {
            const initialSplits = membersEmail.map((email) => ({
                email,
                amount: "",
            }));
            setSplits(initialSplits);
        }
    }, [membersEmail]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSplitChange = (index, value) => {
        const updatedSplits = [...splits];
        updatedSplits[index].amount = value;
        setSplits(updatedSplits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expenseAmount = Number(formData.amount);

        // ✅ Validations
        if (!membersEmail.length) {
            alert("No group members found");
            return;
        }

        if (!expenseAmount || expenseAmount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        let finalSplits = [];

        // ✅ Equal Split Logic
        if (splitType === "equal") {
            const splitAmount = Number(
                (expenseAmount / membersEmail.length).toFixed(2)
            );

            finalSplits = membersEmail.map((email) => ({
                email,
                amount: splitAmount,
            }));
        }

        // ✅ Unequal Split Logic
        else {
            const totalSplit = splits.reduce(
                (sum, s) => sum + Number(s.amount || 0),
                0
            );

            if (Number(totalSplit.toFixed(2)) !== expenseAmount) {
                alert("Split total must equal expense amount");
                return;
            }

            finalSplits = splits.map((s) => ({
                email: s.email,
                amount: Number(Number(s.amount).toFixed(2)),
            }));
        }

        try {
            await addExpense({
                groupId,
                description: formData.description,
                amount: expenseAmount,
                splits: finalSplits,
            });

            // ✅ Reset form
            setFormData({ description: "", amount: "" });

            // ✅ Reset splits
            const resetSplits = membersEmail.map((email) => ({
                email,
                amount: "",
            }));
            setSplits(resetSplits);

            onSuccess();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Failed to add expense");
        }
    };

    // ✅ Remaining amount calculation (nice UX)
    const enteredSplitTotal = splits.reduce(
        (sum, s) => sum + Number(s.amount || 0),
        0
    );

    const remainingAmount =
        Number(formData.amount || 0) - enteredSplitTotal;

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h5 className="fw-bold mb-3">Add New Expense</h5>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">

                        {/* ✅ Description */}
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Expense Title"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* ✅ Amount */}
                        <div className="col-md-4">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* ✅ Submit */}
                        <div className="col-md-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* ✅ Split Type Selector */}
                    <div className="mt-3">
                        <label className="form-label fw-semibold">
                            Split Type
                        </label>
                        <select
                            className="form-select"
                            value={splitType}
                            onChange={(e) => setSplitType(e.target.value)}
                        >
                            <option value="equal">Equal Split</option>
                            <option value="unequal">Unequal Split</option>
                        </select>
                    </div>

                    {/* ✅ Unequal Split UI */}
                    {splitType === "unequal" && (
                        <div className="mt-3">
                            <label className="form-label fw-semibold">
                                Enter Split Amounts
                            </label>

                            {splits.map((split, index) => (
                                <div
                                    key={split.email}
                                    className="d-flex mb-2 gap-2"
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={split.email}
                                        disabled
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={split.amount}
                                        onChange={(e) =>
                                            handleSplitChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}

                            {/* ✅ Remaining indicator */}
                            <div className="text-end">
                                <small
                                    className={`fw-semibold ${remainingAmount === 0
                                            ? "text-success"
                                            : "text-danger"
                                        }`}
                                >
                                    Remaining: ₹
                                    {remainingAmount.toFixed(2)}
                                </small>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddExpenseForm;




// import { useState, useEffect } from "react";
// import { addExpense } from "../../service/expenseApi";


// function AddExpenseForm({ groupId, membersEmail = [], onSuccess }) {
//     const [splitType, setSplitType] = useState("equal");

//     const [splits, setSplits] = useState([]);

//     const [formData, setFormData] = useState({
//         description: "",
//         amount: "",
//     });

//     const handleChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const expenseAmount = Number(formData.amount);

//         if (!membersEmail.length) {
//             alert("No group members found");
//             return;
//         }

//         // ✅ Equal Split Logic
//         const splitAmount = expenseAmount / membersEmail.length;

//         const splits = membersEmail.map((email) => ({
//             email,
//             amount: splitAmount,
//         }));

//         try {
//             await addExpense({
//                 groupId,
//                 description: formData.description,
//                 amount: expenseAmount,
//                 splits,
//             });

//             setFormData({ description: "", amount: "" });
//             onSuccess();
//         } catch (error) {
//             console.error("Error adding expense:", error);
//         }
//     };

//     useEffect(() => {
//         if (membersEmail.length) {
//             const initialSplits = membersEmail.map(email => ({
//                 email,
//                 amount: ""
//             }));
//             setSplits(initialSplits);
//         }
//     }, [membersEmail]);

//     return (
//         <div className="card shadow-sm border-0 mb-4">
//             <div className="card-body">
//                 <h5 className="fw-bold mb-3">Add New Expense</h5>

//                 <form onSubmit={handleSubmit}>
//                     <div className="row g-3">
//                         <div className="col-md-6">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Expense Title"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="col-md-4">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Amount"
//                                 name="amount"
//                                 value={formData.amount}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div className="col-md-2">
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary w-100"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddExpenseForm;