import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/FogotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import UserRoute from "./components/routes/UserRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";

//for navigation from ant Header
import Header from "./components/nav/Header";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./functions/auth";


const App = () => {
  const dispatch = useDispatch();

  //to check the firebase auth state; this
  //loads wheneverever component mounts or state change happens
  //useEffect takes a function and dependency array as arguments
  useEffect(() => {
    //dispatch user information to redux store
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //if we have user get user's token -> access protected routes later
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        //dispatch token to redux store (make sure you send all the user fields you need!!)
        // dispatch({
        //   //expecting type and payload
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   },
        // });

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              //expecting type and payload
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup

    return () => unsubscribe();
  }, [dispatch]);

  return (
    //this is wrapped in index.js with BrowserRouter
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
