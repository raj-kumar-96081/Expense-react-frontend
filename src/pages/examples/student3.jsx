function Student({name,rollno,percentage}){
    return(
        <>
            {percentage>33.0 && (
                <p>
                    Student Name:{name}
                    <br/>
                    Roll No.:{rollno}
                    <br/>
                    Percentage:{percentage}
                    <br/>
                    Result:Pass

                </p>
            )}
            
            {percentage<=33.0 &&(
                <p>
                    Student Name:{name}
                    <br/>
                    Roll No.:{rollno}
                    <br/>
                    Percentage:{percentage}
                    <br/>
                    Result:Fail

                </p>
            )}
        </>
    );
}
export default Student;