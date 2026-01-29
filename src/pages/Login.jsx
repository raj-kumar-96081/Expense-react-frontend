//use predesigned componetns from bootstrap free library
import {useState} from 'react';
function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors,setErrors]=useState({});

    const handleChange = (event) => {
        const name=event.target.name;
        const value=event.target.value;
        setFormData({
            ...formData,
            [name]:value
        });
        
    };

    const validate=()=>{
        let newErrors={};
        let isValid=true;

        // if(!formData.email){
        //     isValid=false;
        //     newErrors.email="Email is required";
        // }
        // if(!formData.password){
        //     isValid=false;
        //     newErrors.password="Password is required";
        // }
        if(formData.password.length===0){
            isValid=false;
            newErrors.password="Password is required";
        }
        if(formData.email.length===0){
            isValid=false;
            newErrors.email="Email is required";
        }
        setErrors(newErrors);
        return isValid;

    };

    const handleSubmit = (event) => {
        event.preventDefault();//Prevenet default form submission behavior of reloading the page
        if(validate()){
            console.log('Valid Form data submitted:', formData);
        }else{
            console.log('Invalid Form data:', formData);
        }
        // Add your login logic here
    }
    return(
        <div className="container">
            <h2 className="text-center">Login to continue..</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="email" id="email" name="email" required 
                    onChange={handleChange}/>
                    <br/>
                    {errors.email && (errors.email)}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" required 
                    onChange={handleChange} />
                    <br/>
                    {errors.password && (errors.password)}

                </div>
                <br/>
                <div>
                    <button className="btn btn-primary" type="submit" >Login</button>
                </div>
            </form>
        </div>
    );
}
export default Login;