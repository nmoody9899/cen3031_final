import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";

import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { createOrUpdateUser } from "../../functions/auth";

import PropTypes from "prop-types";

//import axios from "axios"; now imported from functions/auth

//we can destructure history from props because this is on the routing Route
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //destructure user from state
  const { user } = useSelector((state) => ({ ...state }));

  //useEffect will run when component mounts or state changes parameters (function, dependency_array)
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return; //this blocks the rest running
    } else {
      if (user && user.token) {
        history.push("/"); //push to the home page
      }
    }
  }, [user, history]); //user is dependency here since it might take a moment to load user from firebase

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    //redirect to page the user came from (intended)
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        //redirect to admin dashboard
        history.push("/admin/dashboard");
      } else {
        //redirect to user dashboard
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (event) => {
    //https://firebase.google.com/docs/auth/web/start

    //prevent browser from reloading after button submit
    event.preventDefault();
    setLoading(true);

    //console.table(email, password);
    //log user in using firebase
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result);
      // use firebase first and later we'll use mongoDB: dispatch to redux store
      //destructure user, token from result above
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      //before we dispatch we will send request to backend (this returns a promise)
      createOrUpdateUser(idTokenResult.token)
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
          //redirect user based on role, sending response data
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      //   //we'll redirect here based on user role later
      //history.push("/"); //default place holder for now before dashboard
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            autoFocus
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </div>

        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          shape="round"
          block
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6 ? true : false}
        >
          Login with Email/Password
        </Button>
      </form>
    );
  };

  const googleLogin = async () => {
    //
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // dispatch({//expecting type and payload
        //     type: 'LOGGED_IN_USER',
        //     payload: {
        //       email: user.email,
        //       token: idTokenResult.token,
        //     },
        //   });

        //we'll redirect here based on user role later
        //history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="page-container">
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {!loading ? (
              <h4>Login</h4>
            ) : (
              <h4 className="text-danger">Loading...</h4>
            )}
            {loginForm()}

            <br />
            <Button
              onClick={googleLogin}
              type="danger"
              className="mb-3"
              shape="round"
              block
              icon={<GoogleOutlined />}
              size="large"
            >
              Login with Google
          </Button>

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password
          </Link>

          </div>
        </div>
      </div>
      <body>
        <div id="content-wrap">
        </div>
      </body>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Login;
