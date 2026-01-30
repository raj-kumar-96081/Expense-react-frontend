function Dashboard({user}){
    return(
        <div className="container text-center">
            <h2>Welcome, {user.name}!</h2>
        </div>
    );
}
export default Dashboard;