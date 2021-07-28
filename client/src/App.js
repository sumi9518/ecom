
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Header from './components/nav/header';
import RegisterComplete from "./pages/auth/RegisterComplete";

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { identifier } from 'babel-types';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {

  const dispatch = useDispatch();

  ///to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "Logged_In_User",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    //clean up
    return () => unsubscribe();
  }, [])

  return (
    <div>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Register/Complete" component={RegisterComplete} />
        <Route exact path="/Forgot/Password" component={ForgotPassword} />
      </Switch>
    </div>
  );
}

export default App;
