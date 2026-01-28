import Student3 from './student3.jsx'

function StudentList({students}){
    return(
        <div>
            <h3>Student List </h3>
            {students.map((student,index)=>(
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