/**
 * 
 * every component must return single parent node 
 * which will be rendered
 * 
 */


function Student() {
    let name='Tommy';
    let rollNo=10;
    return (
        <>  
        <p>Name:{name}
            <br/>
            Roll No:{rollNo}</p>

        </>
    );
}
export default Student;