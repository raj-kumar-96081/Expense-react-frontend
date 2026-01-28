import Team from './Team.jsx';

function EngineeringTeam({Employees}){

    const filteredEmployee = Employees.filter(employee =>{
         return employee.department == 'Engineering';
    });
    return(
        <div>
            <h3>Employee filetered List </h3>
            {filteredEmployee.map((employee,index)=>(
                <Team
                    key={index}
                    name={employee.name}
                    department={employee.department}
                    active={employee.active}
                />

            ))}
        </div>
    )
}

export default EngineeringTeam;