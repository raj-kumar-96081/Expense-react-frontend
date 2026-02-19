import { settleGroup } from "../../service/expenseApi";

function SettleGroupButton({ groupId, onSuccess }) {
    const handleSettle = async () => {
        await settleGroup(groupId);
        onSuccess();
    };

    return (
        <div className="text-end">
            <button
                className="btn btn-outline-success"
                onClick={handleSettle}
            >
                Settle Group
            </button>
        </div>
    );
}

export default SettleGroupButton;