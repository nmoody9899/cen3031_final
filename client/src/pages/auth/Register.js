import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  //destructure user from state
  const { user } = useSelector((state) => ({ ...state }));

  //useEffect will run when component mounts or state changes parameters (function, dependency_array)
  useEffect(() => {
    if (user && user.token) {
      history.push("/"); //push to the home page
    }
  }, [user]); //user is dependency here since it might take a moment to load user from firebase

  const handleSubmit = async (event) => {
    //send email with a link to user after they register
    //https://firebase.google.com/docs/auth/web/start

    //prevent browser from reloading after button submit
    event.preventDefault();

    console.log("ENV-->", process.env.REACT_APP_REGISTER_REDIRECT_URL);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    //await firebase auth method
    await auth.sendSignInLinkToEmail(email, config);

    //now notify user with Toast notification
    toast.success(
      `Email has been sent to ${email}. Click the link to complete registration.`
    );

    //save user email to the local storage for retrieval after registration
    window.localStorage.setItem("emailForRegistration", email);

    //clear the form after user submits
    setEmail("");
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          autoFocus
        />

        <br />
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          shape="round"
          block
          icon={<MailOutlined />}
          size="large"
          disabled={!email ? true : false}
        >
          Register with Email
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
