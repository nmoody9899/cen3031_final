import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";//hook to get parameters (slug)
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getBrand, updateBrand } from "../../../functions/brand";
import BrandForm from "../../../components/forms/BrandForm";
import PropTypes from "prop-types";

const BrandUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  //let { slug } = useParams();

  //load all categories when component mounts
  useEffect(() => {
    //get one category based on route parameter
    //console.log(match);
    loadBrand();
  }, []);

  const loadBrand = () =>
    getBrand(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to update a Category we need to send the name to back end
    updateBrand(match.params.slug, { name: name }, user.token)
      .then((res) => {
        //console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Brand "${res.data.name}" updated successfully`);
        history.push("/admin/brand"); //need to redirect here otherwise get error because category no longer exists
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
            <h4>Update Brand</h4>
          )}
          <BrandForm
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

BrandUpdate.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default BrandUpdate;
