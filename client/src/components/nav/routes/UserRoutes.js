import React from 'react';
import { Route, Link } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { useSelector } from 'react-redux';

const UserRoutes = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));            // geting user data from redux state

    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ) : (
        <LoadingToRedirect />
    );
};

export default UserRoutes;