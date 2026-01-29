//use predesigned componetns from bootstrap free library
import {useState} from 'react';
import axios from 'axios';

function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors,setErrors]=useState({});
    const [message,setMessage]=useState('');

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

    const handleSubmit = async(event) => {
        event.preventDefault();//Prevenet default form submission behavior of reloading the page
        if(validate()){
            try{
                const body={
                    email:formData.email,
                    password:formData.password
                };
                const config={withCredentials:true};
                const response=await axios.post('http://localhost:5001/auth/login',body,config);
                console.log(response);
                setMessage('User logged in successfully!');
            }catch(error){
                console.error('Login error:',error);
                setErrors((p) => ({...p , message : 'Login failed. Please try again.'}));
            }
        }
        // Add your login logic here
    }
    return(
        <div className="container">
            <h2 className="text-center">Login to continue..</h2>
            {message &&(message)}
            {errors.message && (errors.message)}

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
                <p>New User! <button className="btn btn-primary" type="button" onClick={() => window.location.href = '/registerf'}>Register</button></p>
            </form>
        </div>
    );
}
export default Login;