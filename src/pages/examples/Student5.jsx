import {useState} from 'react';


function Student4(){
    const [visible,setVisible] = useState(true);
    const [buttonText,setButtonText]= useState("Hide Student");

    const studentList= [
        {name:'Alice',rollno:101,percentage:85},
        {name:'Bob',rollno:102,percentage:45},
        {name:'Charlie',rollno:103,percentage:25}
    ];

    const handleClick=()=>{
        setVisible(!visible);
        setButtonText(visible ? "Show Student" : "Hide Student");
    }

    return(
        <div>
            <button onClick={handleClick}>{buttonText}</button>

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