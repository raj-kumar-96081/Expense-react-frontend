import {useState} from 'react';
import axios from 'axios';
import '../Components/loginform1.css';

function Login2({setUser}){
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
                setUser(response.data.user);
                console.log(response);
                setMessage('User logged in successfully!');
            }catch(error){
                console.error('Login error:',error);
                setErrors((p) => ({...p , message : 'Login failed. Please try again.'}));
            }
        }
        // Add your login logic here
    }

    const handleSignUpClick = (event) => {
        event.preventDefault();
        window.location.href = '/registerf'; 
    }

    return(
        <>
            {/*====== SIGNIN ONE PART START ======*/}
            <section className="signin-area signin-one">
                <div className="container">
                    <h2 className="text-center">Login to Continue</h2>
                    <br/>
                    {message &&(message)}
                    {errors.message && (errors.message)}
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <form action="">
                                <div className="signin-form form-style-two rounded-buttons">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>Email:</label>
                                                <div className="input-items default">
                                                    <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                                                    <i className="lni lni-envelope" />
                                                </div>
                                            </div>
                                            {/* form input */}
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>Password:</label>
                                                <div className="input-items default">
                                                    <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                                                    <i className="lni lni-key" />
                                                </div>
                                            </div>
                                            {/* form input */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input rounded-buttons">
                                                <button
                                                    className="btn primary-btn rounded-full"
                                                    type="submit" onClick={handleSubmit}
                                                >
                                                    Sign In!
                                                </button>
                                            </div>
                                            {/* form input */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input rounded-buttons">
                                                <button
                                                    className="btn primary-btn-outline rounded-full"
                                                    type="submit" onClick={handleSignUpClick}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                            {/* form input */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input text-center">
                                                <p className="text">
                                                    By signing in you agree with the
                                                    <a href="javascript:void(0)">  Terms and Conditions  </a>
                                                    and
                                                    <a href="javascript:void(0)">  Privacy </a>
                                                </p>
                                            </div>
                                            {/* form input */}
                                        </div>
                                    </div>
                                </div>
                                {/* signin form */}
                            </form>
                        </div>
                    </div>
                    {/* row */}
                </div>
                {/* container */}
            </section>
            {/*====== SIGNIN ONE PART ENDS ======*/}
        </>

    );
}
export default Login2;