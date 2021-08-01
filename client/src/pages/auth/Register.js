import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// below funtion is used to initialze variable (email) & also contains other function (handlesubmit) within.

const Register = ({ history }) => {

    const [email, setEmail] = useState("");          //initializing
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]); //as soon as we have user or user changes we redirect (useEffect runs when comp mounts)


    //In below function  data is passed and result in sending automated email to user.

    const handlesubmit = async (e) => {
        e.preventDefault();
        //console.log("env --", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        if (!email) {
            toast.error("Email is Required for registration");
            return;
        }
        //using env file for link instead of hard coding for safety.

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click on the link to complete the Registration.`);
        window.localStorage.setItem("email", email);                  //save user email inlocal storage
        setEmail("");                                                  //empty the field

    };

    //Form is created in function instead of return bcz its lengthy, just call function in return and add code in called function.
    //In the funtion of form (below), another method (handleSubmit) is called to deal with data from form.
    const RegisterForm = () => (
        <form onSubmit={handlesubmit} >
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email"
                autoFocus
            />
            < br />
            <button type="submit" className="btn btn-primary" >
                Register
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {RegisterForm()}
                </div>
            </div>
        </div>
    );
};
export default Register;