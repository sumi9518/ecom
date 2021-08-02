import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../../functions/auth';

const AdminRoutes = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));            // geting user data from redux state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    //console.log("Current Admin Res", res);
                    setOk(true);
                })
                .catch((err) => {
                    //console.log("Current Admin err", err);
                    setOk(false);
                });
        };

    }, [user]);
    return ok ? (
        <Route {...rest} render={() => children} />
    ) : (
        <LoadingToRedirect />
    );
};

export default AdminRoutes;