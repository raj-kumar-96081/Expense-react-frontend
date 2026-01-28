function Team({name,department,active}){
    return(
        <>  
            {active==true &&(
            <p>
                Name: {name}
                <br/>
                Department: {department}
                <br/>
            </p>
            )}
        </>
    )
    
}
export default Team;