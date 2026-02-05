import './loginform1.css';
import { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/action";


function Registerform() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        // if(!formData.email){
        //     isValid=false;
        //     newErrors.email="Email is required";
        // }
        // if(!formData.password){
        //     isValid=false;
        //     newErrors.password="Password is required";
        // }
        if (formData.name.length === 0) {
            isValid = false;
            newErrors.name = "Name is required";
        }
        if (formData.password.length === 0) {
            isValid = false;
            newErrors.password = "Password is required";
        }
        if (formData.email.length === 0) {
            isValid = false;
            newErrors.email = "Email is required";
        }
        setErrors(newErrors);
        return isValid;

    };

    const handleSubmit = async (event) => {
        event.preventDefault();//Prevent default form submission behavior of reloading the page
        if (validate()) {
            try {
                const response = await axios.post(
                    "http://localhost:5001/auth/register",
                    formData,
                    { withCredentials: true }
                );

                // ✅ Update Redux
                dispatch({ type: SET_USER, payload: response.data.user });
                // const body = {
                //     email: formData.email,
                //     name: formData.name,
                //     password: formData.password
                // };
                // const config = { withCredentials: true };
                // const response = await axios.post('http://localhost:5001/auth/register', body, config);
                // setUser(response.data.user);
                // console.log(response);
                setMessage('User registered successfully!');
            } catch (error) {
                console.error('Registration error:', error);
                setErrors((p) => ({ ...p, message: 'Registration failed. Please try again.' }));
            }
        }
        // Add your login logic here
    }
    const handleGoogleSuccess = async (authResponse) => {
        try {
            const response = await axios.post(
                "http://localhost:5001/auth/google-auth",
                { idToken: authResponse?.credential },
                { withCredentials: true }
            );

            // ✅ Update Redux
            dispatch({ type: SET_USER, payload: response.data.user });
        } catch (error) {
            console.error(error);
            setErrors({ message: "Unable to login with Google" });
        }
    };

    const handleGoogleFailure = () => {
        setErrors({
            message: "Something went wrong while performing Google sign-in"
        });
    };

    const handleSignInClick = (event) => {
        event.preventDefault();
        window.location.href = '/login2';
    }

    return (
        <>
            {/*====== SIGNIN ONE PART START ======*/}
            <section className="signin-area signin-one">
                <div className="container">
                    <h2 className="text-center">Fill in details to Continue</h2>
                    <br />
                    {message && (message)}
                    {errors.message && (errors.message)}
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <form onSubmit={handleSubmit}>
                                <div className="signin-form form-style-two rounded-buttons">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>Email:</label>
                                                <div className="input-items default">
                                                    <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                                                    <i className="lni lni-envelope" />
                                                </div>
                                                {errors.name && (
                                                    <small className="text-danger">{errors.email}</small>
                                                )}
                                            </div>
                                            {/* form input */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-input">
                                                <label>
                                                    Name:
                                                </label>
                                                <div className="input-items default">
                                                    <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                                                    <i className="lni lni-user" />
                                                </div>
                                                {errors.name && (
                                                    <small className="text-danger">{errors.name}</small>
                                                )}
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
                                                {errors.name && (
                                                    <small className="text-danger">{errors.password}</small>
                                                )}
                                            </div>
                                            {/* form input */}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-input rounded-buttons">
                                                <button
                                                    className="btn primary-btn rounded-full"
                                                    type="button" onClick={handleSignInClick}
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
                                                    type="submit" onClick={handleSubmit}
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
                        <div className="mt-4">
                            <GoogleOAuthProvider
                                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                            >
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleFailure}
                                />
                            </GoogleOAuthProvider>
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
export default Registerform;
