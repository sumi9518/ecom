
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
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserRoutes from './components/nav/routes/UserRoutes';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';




const App = () => {

  const dispatch = useDispatch();

  ///to check firebase auth state
  useEffect(() => {                                   //UseEffect runs each time page is updated, so best place to get use data & store for overall app
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();    //This data will persist in redx from DB (created endpoint)
        currentUser(idTokenResult.token)        //Below data dnot persist in redux after refresh, so we make req to own DB in App.js
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
        <UserRoutes exact path="/user/History" component={History} />
        <UserRoutes exact path="/user/Password" component={Password} />
        <UserRoutes exact path="/user/Wishlist" component={Wishlist} />
      </Switch>
    </div>
  );
}

export default App;
