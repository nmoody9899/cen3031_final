import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";//hook to get parameters (slug)
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getFormOrType, updateFormOrType } from "../../../functions/formortype";
import FormOrTypeForm from "../../../components/forms/FormOrTypeForm";
import PropTypes from "prop-types";

const FormOrTypeUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  //let { slug } = useParams();

  //load all categories when component mounts
  useEffect(() => {
    //get one category based on route parameter
    //console.log(match);
    loadFormOrType();
  }, []);

  const loadFormOrType = () =>
    getFormOrType(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to update a Category we need to send the name to back end
    updateFormOrType(match.params.slug, { name: name }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Form or Type "${res.data.name}" udpated successfully`);
        history.push("/admin/formortype"); //need to redirect here otherwise get error because category no longer exists
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
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
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Form or Type</h4>
          )}
          <FormOrTypeForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

FormOrTypeUpdate.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default FormOrTypeUpdate;
