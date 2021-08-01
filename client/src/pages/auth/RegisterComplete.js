import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';


// below funtion is used to initialze variable (email) & also contains other function (handlesubmit) within.

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");                                   //initializing
    const [password, setPassword] = useState('');                              //props.history for props OR {history}

    //const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    const CreateOrUpdateUser = async (authtoken) => {
        return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {     //data passed to auth.js in server middleware
            headers: {
                authtoken,
            }
        });
    }

    useEffect(() => {
        setEmail(window.localStorage.getItem('email'));

    }, [history])                                                                    //takes first argument & dependency e.g [password] so when password change the func will run

    //In below function  data is passed and result in sending automated email to user.

    const handlesubmit = async (e) => {
        e.preventDefault();                                     //passwordless auth, need email & auth key

        if (!password || !email) {
            toast.error("Email and Password is Required");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be atleast 6 characters long");
            return;
        }


        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);   //will get verified true in result which help passwordless login
            //console.log(result);
            if (result.user.emailVerified) {

                //remove user email from storage
                window.localStorage.removeItem('email');

                //get user token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                //console.log('user', user, 'idtoken', idTokenResult);
                // redux store
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

                    })
                    .catch(err => console.log(err));

                //redirect user
                history.push('/');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };



    //Form is created in function instead of return bcz its lengthy, just call function in return and add code in called function.
    //In the funtion of form (below), another method (handleSubmit) is called to deal with data from form.



    const CompleteRegisterForm = () => (
        <form onSubmit={handlesubmit} >
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <br />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-primary" >
                Complete Registeration
            </button>
        </form>
    );


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registration</h4>
                    {CompleteRegisterForm()}
                </div>
            </div>
        </div>
    );
};
export default RegisterComplete;