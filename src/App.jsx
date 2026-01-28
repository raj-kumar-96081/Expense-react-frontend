import Student from './pages/examples/Student.jsx'
import Student1 from './pages/examples/Student1.jsx'
import Student2 from './pages/examples/Student2.jsx'
import Student3 from './pages/examples/student3.jsx'
import StudentList from './pages/examples/StudentList.jsx'
import StudentList2 from './pages/examples/StudentList2.jsx'
import UserCard from './pages/practice/UserCard.jsx'
import EngineeringTeam from './pages/practice/EngineeringTeam.jsx'
import Student4 from './pages/examples/Student4.jsx'
import Student5 from './pages/examples/Student5.jsx'


function App() {

  return (
    <>
      
      <h1>Expense Management System</h1>
      <Student/>
        <Student1/>
        <Student2 name="Alice" rollNo={42}/>
        <Student3 name="Bob" rollno={15} percentage={45.5}/>
        <Student3 name="Charlie" rollno={22} percentage={28.0}/>
        <StudentList students={[
          {name:'David', rollno:11, percentage:67.5},
          {name:'Eva', rollno:12, percentage:32.0},
          {name:'Frank', rollno:13, percentage:49.5},
        ]}/>
        <StudentList2 students={[
          {name:'George', rollno:21, percentage:72.0},
          {name:'Hannah', rollno:22, percentage:29.5},
          {name:'Ian', rollno:23, percentage:38.0},
        ]}/>

        <UserCard 
          name="John Doe"
          age={30}
          location="New York"
          isPremium={true}
        />

        <EngineeringTeam Employees={[
          {name:'Jack', department:'Engineering', active:true},
          {name:'Karen', department:'Marketing', active:false},
          {name:'Liam', department:'Engineering', active:true},
          {name:'Mia', department:'Sales', active:true},
        ]}/>

        <Student4 />
        <Student5/>

      
    </>
  )
}

export default App
