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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState('newest');


    const fetchGroups = async (page = 1) => {
        try {
            const response = await axios.get(`${serverEndpoint}/groups/my-groups?page=${page}&limit=${limit}&sortBy=${sortBy}`,
                { withCredentials: true }
            );
            setGroups(response?.data?.groups);
            setTotalPage(response?.data?.pagination?.totalPages);
            setCurrentPage(response?.data?.pagination?.currentPage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGroupUpdateSuccess = (data) => {
        //default to the first page whenever there sin an update in the groups
        fetchGroups(1);

        // setGroups(prevGroups => [...prevGroups, data]);

        // groups.push(data);   
    }

    useEffect(() => {
        fetchGroups(currentPage);
    }, [currentPage, limit, sortBy]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    //for dropdown menu chnages in page size
    const handleLimitChange = (e) => {
        const newLimit = Number(e.target.value);
        setLimit(newLimit);
        setCurrentPage(1); // reset to first page
    };

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
                    <div className='col-md-4 text-center text-md-end'>
                        <div className='d-flex align-tems-center w-sm-auto'>
                            <label className=''>Sort: </label>
                            <select className='form- select form-select-sm rounded-pill'
                                value={sortBy} onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                            <button className='btn btn-primary rounded-pill px-4 fw-bold shadow-sm' onClick={() => setShow(true)}>
                                Create Group
                            </button>
                        </div>
                    </div>
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
            <div className="d-flex justify-content-between align-items-center mt-4">
                {/* Page size selector */}
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Rows per page:</span>
                    <select
                        className="form-select form-select-sm w-auto"
                        value={limit}
                        onChange={handleLimitChange}
                    >
                        {[5, 10, 20, 50, 100].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                {totalPages > 1 && (

                    <nav className='mt-5 d-flex justify-content-center '>
                        <ul className='pagination shadow-sm'>
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>
                                    &laquo;

                                </button>
                            </li>
                            {[...Array(totalPages)].map((num, index) => (
                                <li key={index} className={`page-item ${currentPage === (index + 1) ? "active" : ""}`}>
                                    <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            {/* next page bottom link */}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className='page-link' onClick={() => handlePageChange(currentPage + 1)}>
                                    &raquo;

                                </button>
                            </li>
                        </ul>
                    </nav>

                )}
            </div>


            <CreateGroupModal show={show} onHide={() => setShow(false)} onSuccess={handleGroupUpdateSuccess} />
        </div>
    );
}
export default Groups;