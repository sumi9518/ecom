import React, { useState, useEffect } from 'react';
import { auth, GoogleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CreateOrUpdateUser } from '../../functions/auth';





// below funtion is used to initialze variable (email) & also contains other function (handlesubmit) within.

const Login = ({ history }) => {

    const [email, setEmail] = useState("");          //initializing
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

const roleBasedRedirect= (res) => {
    if(res.data.role === "admin"){
    history.push('/admin/dashboard');
    } else {
        history.push('/user/history');
    }
};




    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user]); //as soon as we have user or user changes we redirect (useEffect runs when comp mounts)


    //In below function  data is passed and result in sending automated email to user.

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result
            const idTokenResults = await user.getIdTokenResult();
            
            CreateOrUpdateUser(idTokenResults.token)        //Below data dnot persist in redux after refresh, so we make req to own DB in App.js
            .then((res) => {
                dispatch({
                    type: "Logged_In_User",
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResults.token,
                        role: res.data.role,
                        uid: res.data._id
                    },
                });

                roleBasedRedirect(res);

            })
            .catch(err => console.log(err));

           
            //history.push('/');

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);

        }
    };
    const googleLogin = async (e) => {
        auth.signInWithPopup(GoogleAuthProvider)            // to get pop up window of google login
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult();
                CreateOrUpdateUser(idTokenResult.token)        //Below data dnot persist in redux after refresh, so we make req to own DB in App.js
                .then((res) => {
                    dispatch({
                        type: "Logged_In_User",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            uid: res.data._id
                        },
                    });
                    roleBasedRedirect(res);
                })
                .catch();
    
                //history.push('/');

            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });

    };

    //Form is created in function instead of return bcz its lengthy, just call function in return and add code in called function.
    //In the funtion of form (below), another method (handleSubmit) is called to deal with data from form.
    const LoginForm = () => (
        <form onSubmit={handlelogin} >
            <div className="fprm-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email"
                    autoFocus
                />
                <br />
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter your password"

                />
                <br />
                <Button
                    onClick={handlelogin}
                    type="primary"
                    className="mb-3"
                    block
                    shape="round"
                    icon={<MailOutlined />}
                    size="large"
                    disabled={!email || password.length < 6}
                >
                    Login with Email/Password
                </Button>
            </div>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4 className="text-danger">Loading ...</h4> : <h4>Login</h4>}
                    {LoginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button>
                    <Link to="/forgot/password" className="float-right text danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;