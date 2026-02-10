import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import axios from "axios";
// import { useState } from "react";


function GroupCard({ group, onUpdate }) {
    const [showMembers, setShowMembers] = useState(false);
    const [memberEmail, setMemberEmail] = useState('');
    const [error, setErrors] = useState({});

    const handleShowMembers = () => {
        setShowMembers(!showMembers);
    }

    const handleAddMember = async () => {
        if (memberEmail.length === 0) {
            return;
        }

        try {
            const response = await axios.patch(
                `${serverEndpoint}/groups/members/add/`, {
                groupId: group._id,
                emails: { memberEmail }
            },
                { withCredentials: true }
            );
            onUpdate(response.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: "Unable to add member" })
        }

    }

    return (
        <div className="card h-100 border-0 shadow-sm rounded-4 position-relative">
            <div className="card-body p-4 ">
                <div>
                    <h5 className="">{group.name}</h5>
                    <button className="btn btn-md p-2 text-primary fw-bold" onClick={handleShowMembers}>
                        Show Members | {group.membersEmail.length}
                    </button>
                </div>
                <p>{group.description}</p>

                {showMembers && (
                    <div className="rounded-3 p-3 mb-3 border">
                        <h4>Members in this Group:</h4>
                        {group.membersEmail.map((member, index) => (
                            <div key={member}>
                                {index + 1}.{member}
                            </div>
                        ))}
                    </div>
                )}
                <div className="mb-3">
                    <label className="form label extra-small fw-bold text-secondary"> Add Member</label>
                    <div className="input-group intput-group-sm">
                        <input type="email" className="form-control border-end-0" value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)} />
                        <button className="btn btn-primary px-3" onClick={handleAddMember}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupCard;