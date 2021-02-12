import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return (
    //endpoint for this request is /api/create-or-update-user
    await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {}, //body (pass product information here)
      {
        //passing token in header
        headers: {
          authtoken: authtoken,
        },
      }
    )
  );
};

export const currentUser = async (authtoken) => {
  return (
    //endpoint for this request is /api/create-or-update-user
    await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {}, //body (pass product information here)
      {
        //passing token in header
        headers: {
          authtoken: authtoken,
        },
      }
    )
  );
};
