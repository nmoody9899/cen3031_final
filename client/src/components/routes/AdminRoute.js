import React, {useEffect, useState } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

//need user state from Redux
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

//https://reactrouter.com/web/example/auth-workflow
const AdminRoute = ({ children, ...rest }) => {
  //access user from state
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(()=>{
      if(user && user.token){
          currentAdmin(user.token)
          .then(res => {
              console.log('CURRENT ADMIN RES', res);
              setOk(true);
          })
          .catch(err => {
              console.log("ADMIN ROUTE ERR", err);
              setOk(false);
          })
      }

  }, [user]);

  //might want to show a loading message
  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.any,
};

export default AdminRoute;
