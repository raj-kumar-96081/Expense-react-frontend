import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserHeader() {
    const user = useSelector((state) => state.userDetails);
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    ExpenseApp
                </Link>

                <button
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-bs-target="#navbarSupportedContent"
                    data-bs-toggle="collapse"
                    type="button"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link' to="/groups">
                                My Groups
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                aria-current="page"
                                className="nav-link active"
                                to="/dashboard"
                            >
                                {user?.name || "Account"}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}


export default UserHeader;
