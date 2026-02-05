import { useSelector } from 'react-redux';

function Dashboard(){
     const user = useSelector((state) => state.userDetails);
    return(
        <div className="container text-center">
            <h2>Welcome, {user.name} To Expense App Your Expense Friend</h2>
        </div>
    );
}
export default Dashboard;