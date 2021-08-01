import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Password = (e) => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(password);
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password Update Successfully");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            }
            )
    }

    const UpdatePasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Please enter your new password"
                    disabled={loading}
                    value={password}
                />
                <br />
                <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
            </div>
        </form>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Password Update Form</h4>)}
                    {UpdatePasswordForm()}
                </div>
            </div>
        </div>
    );

};

export default Password;