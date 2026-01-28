import {useState} from 'react';


function Student4(){
    const [visible,setVisible] = useState(true);

    const studentList= [
        {name:'Alice',rollno:101,percentage:85},
        {name:'Bob',rollno:102,percentage:45},
        {name:'Charlie',rollno:103,percentage:25}
    ];

    const handleClick=()=>{
        setVisible(!visible);
    }

    return(
        <div>
            <button onClick={handleClick}>{visible ? "Hide Student" : "Show Student"}</button>

            {visible && (
                <>
                    {studentList.map((student,index)=>(
                        <p key={index}>
                            Student Name:{student.name}
                            <br/>
                            Roll No.:{student.rollno}
                            <br/>
                            Percentage:{student.percentage}
                        </p>
                    ))} 
                </>
            )}
        </div>
    )
}
export default Student4;