import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  updateSubCategory,
  getSubCategory,
} from "../../../functions/subcategory";
import CategoryForm from "../../../components/forms/CategoryForm";
import PropTypes from "prop-types";

const SubCategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); //list of categories in select option
  const [parent, setParent] = useState("");
  //for searching and filtering

  //load all categories when component mounts
  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
      console.log(c.data);
    });
  };

  const loadSubCategory = () => {
    getSubCategory(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
      console.log(s.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to create a Category we need to send the name to back end
    updateSubCategory(
      match.params.slug,
      { name: name, parent: parent },
      user.token
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Sub-Category "${res.data.name}" has been updated.`);
        history.push("/admin/subcategory");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

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
            <h4>Update Sub-Category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >
              <option>Select to change Parent Category...</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    //selected={cat._id === parent} use value on select to get past React warning about not using selected (value or defaultValue)
                  >
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          {/*JSON.stringify(category)*/}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

SubCategoryUpdate.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default SubCategoryUpdate;
