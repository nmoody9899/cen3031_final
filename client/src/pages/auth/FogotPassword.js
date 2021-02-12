import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; //if user is logged in they should not land here
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //destructure user from state
  const { user } = useSelector((state) => ({ ...state }));

  //useEffect will run when component mounts or state changes parameters (function, dependency_array)
  useEffect(() => {
    if (user && user.token) {
      history.push("/"); //push to the home page
    }
  }, [user]); //user is dependency here since it might take a moment to load user from firebase

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        //remove email
        setEmail("");
        setLoading(false);
        toast.success("Password reset link sent to email.");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
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
          Email Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
