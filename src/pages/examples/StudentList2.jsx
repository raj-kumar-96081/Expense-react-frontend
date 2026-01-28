import Student3 from './student3.jsx'

function StudentList({students}){

    const filteredStudents = students.filter(student =>{
         return student.percentage >= 35;
    });
    return(
        <div>
            <h3>Student filetered List </h3>
            {filteredStudents.map((student,index)=>(
                <Student3
                    key={index}
                    name={student.name}
                    Rollno={student.rollno}
                    percentage={student.percentage}
                    
                />

            ))}
        </div>
    )
}

export default StudentList;