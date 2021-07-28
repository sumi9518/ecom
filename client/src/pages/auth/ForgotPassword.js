import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user]); //as soon as we have user or user changes we redirect (useEffect runs when comp mounts)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password rese link')
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log(error);
            })
    };


    return (
        <div className="container col-md-6 offset-md-3 p-5" >
            {loading ? (<h4 className="text-danger"> Loading...</h4>) : (<h4>Forgot Password</h4>)}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    autoFocus
                />
                <br />
                <button className="btn btn-primary" disabled={!email}>Submit</button>
            </form>
        </div>
    )


}
export default ForgotPassword;