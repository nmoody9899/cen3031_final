import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  createIngredient,
  getIngredients,
  removeIngredient,
} from "../../../functions/ingredient";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import IngredientCreateForm from "../../../components/forms/IngredientCreateForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  name: "",
  description: "",
  images: [],
};

const IngredientCreate = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);

  //for searching and filtering
  //step 1
  const [keyword, setKeyword] = useState("");

  //load all categories when component mounts
  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = () => {
    getIngredients().then((c) => {
      setIngredientList(c.data);
      console.log(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    //to create a Category we need to send the name to back end
    console.log("calling createIngredient with values: ", values);
    createIngredient(values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        window.alert(`New ingredient "${res.data.name}" created!`);
        window.location.reload();
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

  //deleting category from backend
  const handleRemove = async (slug) => {
    //do not immediately delete, ask admin if they mean to delete, so warn
    let answer = window.confirm(
      `Are you sure you want to delete ingredient "${slug}"?`
    );

    if (answer) {
      setLoading(true);
      removeIngredient(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Ingredient ${res.data.name} deleted`);
          loadIngredients(); //refresh brands immediately after removal
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

          <IngredientCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />

          {/* step 2 & step 3 search: refactored */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <br />
          {/* step 5 search add searched here */}
          {ingredientList.filter(searched(keyword)).map((b) => (
            <div className="alert alert-secondary" key={b._id}>
              {b.name}
              <span
                onClick={() => handleRemove(b.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/ingredient/${b.slug}`}>
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

export default IngredientCreate;
