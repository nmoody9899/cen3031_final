import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  createSubCategory,
  //getSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subcategory";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); //list of categories in select option
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState(""); //category selected by user for creation of subcategory (parent)
  //for searching and filtering
  //step 1
  const [keyword, setKeyword] = useState("");

  //load all categories when component mounts
  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
      console.log(c.data);
    });
  };

  const loadSubCategories = () => {
    getSubCategories().then((s) => {
      setSubCategories(s.data);
      console.log(s.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to create a Category we need to send the name to back end
    createSubCategory({ name: name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Sub-Category "${res.data.name}" has been created.`);
        loadSubCategories();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  //deleting category from backend
  const handleRemove = async (slug) => {
    //do not immediately delete, ask admin if they mean to delete, so warn
    let answer = window.confirm(
      `Are you sure you want to delete sub-category "${slug}"?`
    );

    if (answer) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Sub-Category ${res.data.name} deleted`);
          loadSubCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    } else {
      //nothing
    }
    //console.log(answer, slug);
  };

  //step 4 search
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create Sub-Category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select a Category...</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
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
          {/* step 2 & step 3 search: refactored */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <br />
          {/* step 5 search add searched here */}
          {subCategories.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-secondary" key={sub._id}>
              {sub.name}
              <span
                onClick={() => handleRemove(sub.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subcategory/${sub.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-primary" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
