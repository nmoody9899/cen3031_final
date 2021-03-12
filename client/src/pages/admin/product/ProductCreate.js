import React, { useState, useEffect } from "react";
// import PropType from "prop-types";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getCategories,
  getCategorySubcategories,
} from "../../../functions/category";
import { getBrands } from "../../../functions/brand";
import { getFormOrTypes } from "../../../functions/formortype";
import { getUnitOfMeasures } from "../../../functions/unitofmeasure";
import { getIngredients } from "../../../functions/ingredient";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  herbList: [],
  ingredient: [],
  subcategory: [],
  formsortypes: [],
  formortype: "",
  quantity: "",
  images: [],
  shipping: "no",
  //sizes: ["small", "medium", "large"], //menu populate
  brands: [],
  size: "",
  unitofmeasures: [],
  unitofmeasure: "",
  brand: "Consider Herbs",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  //console.log("Values entering ProductCreate: ", JSON.stringify(values));
  const { user } = useSelector((state) => ({ ...state }));
  const [subOptions, setSubOptions] = useState([]);
  //value to hide subcategory until category selected (hide/show control)
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  //load all categories when component mounts
  useEffect(() => {
    //loadCategories();
  }, []);

  const loadCategories = () => {
    console.log("Values entering loadCategories(): ", JSON.stringify(values));
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        //toast.success(`New product "${res.data.title}" created!`);
        window.alert(`New product "${res.data.title}" created!`);
        window.location.reload();
        //loadCategories();
        //loadBrands();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data.err);
        }
        //toast.error(err.response.data.err); //how to get the actual error from axios
      });
  };

  //on handle change only one item at a time will be updated, so all form fields can use it!
  const handleChange = (e) => {
    //
    //console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, "=====", e.target.value);
  };

  //need to handle change for categories for loading subcategories
  //need subcategory in setValues to clear subcategory in event user selects a different category
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked category _id", e.target.value);
    setValues({ ...values, subcategory: [], category: e.target.value });
    //now get the subs
    getCategorySubcategories(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
      if (res.data.length > 0) {
        setShowSub(true);
      }
    });
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    console.log("Clicked Brand _id", e.target.value);
    setValues({ ...values, brand: e.target.value });
  };

  const handleFormOrTypeChange = (e) => {
    e.preventDefault();
    console.log("Clicked Form or Type _id", e.target.value);
    setValues({ ...values, formortype: e.target.value });
  };

  const handleUnitOfMeasureChange = (e) => {
    e.preventDefault();
    console.log("Clicked Unit _id", e.target.value);
    setValues({ ...values, unitofmeasure: e.target.value });
  };

  const loadBrands = (e) => {
    e.preventDefault();
    getBrands().then((c) => {
      setValues({ ...values, brands: c.data });
    });
  };

  const loadFormOrTypes = (e) => {
    e.preventDefault();
    getFormOrTypes().then((f) => {
      setValues({ ...values, formsortypes: f.data });
    });
  };

  const loadUnitOfMeasures = (e) => {
    e.preventDefault();
    getUnitOfMeasures().then((f) => {
      setValues({ ...values, unitofmeasures: f.data });
    });
  };

  const loadHerbList = (e) => {
    e.preventDefault();
    getIngredients().then((f) => {
      setValues({ ...values, herbList: f.data });
    });
  };

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
            <h4>Create Product</h4>
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
          <hr />
          <br />

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
            handleFormOrTypeChange={handleFormOrTypeChange}
            handleUnitOfMeasureChange={handleUnitOfMeasureChange}
            loadCategories={loadCategories}
            loadHerbList={loadHerbList}
            loadBrands={loadBrands}
            loadFormOrTypes={loadFormOrTypes}
            loadUnitOfMeasures={loadUnitOfMeasures}
            subOptions={subOptions}
            //setShowSub={setShowSub}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
