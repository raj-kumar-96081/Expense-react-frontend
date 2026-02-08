import axios from 'axios';
import { serverEndpoint } from '../config/appConfig';
import { useState, useEffect } from 'react';
import GroupCard from '../Components/GroupCard';
import CreateGroupModal from '../Components/createGroupModal';
import { usePermission } from '../rbac/userPermissions';

function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const group_count = groups?.length || 0;
    const permissions = usePermission();

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/groups/my-groups`,
                { withCredentials: true }
            );
            setGroups(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGroupUpdateSuccess = (data) => {
        setGroups(prevGroups => [...prevGroups, data]);
        // groups.push(data);   
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    if (loading) {
        return (
            <div className='spinner-border' role="status">
                <span className='visually-hidden'> Loading...</span>
            </div>
        );
    }
    return (
        <div className='container p-5'>
            <div className='d-flex justify-content-between align-tems-center mb-0'>
                <div>
                    <h2 className='fw-bold'> Your Groups</h2>
                    <p className='text-muted'> Manage your shared expenses and split expeneses</p>
                </div>
                {permissions.canCreateGroups && (
                    <button className='btn btn-primary rounded-pill px-4 fw-bold shadow-sm' onClick={() => setShow(true)}>
                        Create Group
                    </button>
                )}
            </div>

            {group_count === 0 && (
                <div className=''>
                    <p>No groups found, start by creating one </p>
                </div>
            )}
            {group_count > 0 && (
                <div className='row g-4'>
                    {groups.map((group) => (
                        <div className='col-md-6 col-lg-4' key={group._id}>
                            <GroupCard group={group} onUpdate={handleGroupUpdateSuccess} />
                        </div>
                    ))}
                </div>
            )}
            <CreateGroupModal show={show} onHide={() => setShow(false)} onSuccess={handleGroupUpdateSuccess} />
        </div>
    );
}
export default Groups;