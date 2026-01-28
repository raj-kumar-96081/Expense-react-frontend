function UserCard({name,age,location,isPremium}){
    return(
        <>
        
                <h1>Name: {name}</h1>
                <p>Age: {age}</p>
                <p>Location: {location}</p>
                {isPremium ? (
                    <p>Premium User</p>
                ) : (
                    <p>Standard User</p>
                )}
        </>
    );
}

export default UserCard;