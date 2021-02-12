import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
//import axios from "axios";

//from props - need history.push
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //destructure user from state
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  //props.history
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //sign in with email link
    //validation section
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //clear user email from local Storage
        window.localStorage.removeItem("emailForRegistration");
        //get user id token (from firebase)
        let user = auth.currentUser;
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        //populate user in redux store
        console.log("user", user, "idTokenResult", idTokenResult);

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
          })
          .catch((err) => console.log(err));

        //redirect (using home as standin) want a user dashboard
        history.push("/");

        //user verified so now update user with chosen password
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} readOnly />

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          autoFocus
        />

        <br />

        <button type="submit" className="btn btn-raised">
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
