import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import AdminNav from "../../../components/nav/AdminNav";
import { getProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateProduct } from "../../../functions/product";

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

//can access props here because within BrowserRouter but instead destructure match
//props look like from {JSON.stringify(props)}
/**props=
 * {"history":{"length":50,"action":"PUSH","location":{"pathname":"/admin/product/super-pepper","search":"","hash":"","key":"5akyfp"}},
 * "location":{"pathname":"/admin/product/super-pepper","search":"","hash":"","key":"5akyfp"},
 * "match":{"path":"/admin/product/:slug","url":"/admin/product/super-pepper","isExact":true,"params":{"slug":"super-pepper"}}} *
 */
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
  shipping: "",
  //sizes: ["small", "medium", "large"], //menu populate
  brands: [],
  size: "",
  unitofmeasures: [],
  unitofmeasure: "",
  brand: "",
};

const ProductUpdate = ({ history, match }) => {
  //state
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [arrayOfSubcategoryIds, setArrayOfSubcategoryIds] = useState([]);
  const [subIngredientOptions, setSubIngredientOptions] = useState([]);
  const [arrayOfIngredientIds, setArrayOfIngredientIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      //console.log("single product", p);
      //1 load single product and set values
      setValues({ ...values, ...p.data });
      //2 load single product category subcategory[]

      getCategorySubcategories(p.data.category._id).then((res) => {
        setSubOptions(res.data); //on first load show default subcategories
      });
      //3 prepare array of subcategory ids to show as default sub values in antd Select
      let arr = [];
      let arrIngredient = [];
      let arrIngredientOptions = [];
      p.data.subcategory.map((s) => {
        arr.push(s._id);
      });
      p.data.ingredient.map((i) => {
        arrIngredient.push(i._id);
      });
      p.data.ingredient.map((i) => {
        arrIngredientOptions.push(i);
      });
      console.log("ARR", arr);
      console.log("INGREDIENTLISTARR:", arrIngredient);
      console.log("subIngredientOptions: ", arrIngredientOptions);
      //   setArrayOfSubcategoryIds((prev) => arr); //required for antd Select to work
      setArrayOfSubcategoryIds(arr); //required for antd Select to work
      setArrayOfIngredientIds(arrIngredient);
      setSubIngredientOptions(arrIngredientOptions);
    });
  };

  //FROM PRODUCT CREATE BELOW
  const loadCategories = () => {
    console.log("LOADCATEGORIES IN PRODUCTUPDATE: ", JSON.stringify(values));
    getCategories().then((c) => {
      console.log("GETCATEGORIES IN PRODUCTUPDATE: ", JSON.stringify(c.data));
      setValues({ ...values, categories: c.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subcategory = arrayOfSubcategoryIds;
    values.category = selectedCategory ? selectedCategory : values.category;
    values.ingredient = arrayOfIngredientIds;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`Updated product "${res.data.title}"!`);
        //window.alert(`Product "${res.data.title}" updated!`);
        //window.location.reload();
        history.push("/admin/products"); //push the administrator back to products page
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.err);
        }
        console.log("PRODUCT UPDATE SUBMIT updateProduct ERR --->", err);
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
    setValues({ ...values, subcategory: [] });

    setSelectedCategory(e.target.value);

    //now get the subs
    getCategorySubcategories(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category: ", values.category);

    //if user clicks original category
    //show its sub categories as default sub category values
    if (values.category._id === event.target.value) {
      loadProduct();
    }

    //clear old sub category ids
    setArrayOfSubcategoryIds([]);
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

  //FUNCTIONS FROM PRODUCT CREATE ABOVE

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
            <h4>Update Product Form</h4>
          )}
          <hr />

          {/* {!loading ? JSON.stringify(values) : ""} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <hr />
          <br />

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            //setValues={setValues}
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
            setShowSub={setShowSub}
            showSub={showSub}
            arrayOfSubcategoryIds={arrayOfSubcategoryIds}
            setArrayOfSubcategoryIds={setArrayOfSubcategoryIds}
            arrayOfIngredientIds={arrayOfIngredientIds}
            setArrayOfIngredientIds={setArrayOfIngredientIds}
            subIngredientOptions={subIngredientOptions}
            setSubIngredientOptions={setSubIngredientOptions}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

ProductUpdate.propTypes = {
  match: PropType.any,
  history: PropType.any,
};

export default ProductUpdate;
