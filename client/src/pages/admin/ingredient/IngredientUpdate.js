import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//import { useParams } from "react-router-dom";//hook to get parameters (slug)
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getIngredient,
  //getIngredients,
  updateIngredient,
} from "../../../functions/ingredient";
import IngredientUpdateForm from "../../../components/forms/IngredientUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
const IngredientUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState("");

  const [loading, setLoading] = useState(false);

  //let { slug } = useParams();

  //load all categories when component mounts
  useEffect(() => {
    //get one category based on route parameter
    //console.log(match);
    loadIngredient();
  }, []);

  const loadIngredient = () =>
    getIngredient(match.params.slug).then((c) => setValues(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to update a Category we need to send the name to back end
    updateIngredient(match.params.slug, values, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        //setValues("");
        toast.success(`Ingredient "${res.data.name}" updated successfully`);
        history.push("/admin/ingredients"); //need to redirect here otherwise get error because category no longer exists
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  //on handle change only one item at a time will be updated, so all form fields can use it!
  const handleChange = (e) => {
    //
    //console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, "=====", e.target.value);
  };

  // const categoryForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Category Name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         onChange={(e) => setName(e.target.value)}
  //         value={name}
  //         autoFocus
  //         required
  //       />
  //       <br />
  //       <button className="btn btn-outline-primary">Save</button>
  //     </div>
  //   </form>
  // );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Create Ingredient</h4>
          )}
          <hr />

          {/*!loading ? JSON.stringify(values.images) : ""*/}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <IngredientUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

IngredientUpdate.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default IngredientUpdate;
