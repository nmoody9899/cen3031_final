import React, { useEffect, useState } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getBrands } from "../functions/brand";
import { getSubCategories } from "../functions/subcategory";
import { getIngredients } from "../functions/ingredient";
import { getFormOrTypes } from "../functions/formortype";

import {
  useSelector,
  // , useDispatch
} from "react-redux";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [defaultPrice] = useState([0, 500]);
  const [ok, setOk] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [defaultCatIds, setDefaultCatIds] = useState([]);

  const [brands, setBrands] = useState([]);
  const [brandIds, setBrandIds] = useState([]);
  const [defaultBrandIds, setDefaultBrandIds] = useState([]);

  const [subcats, setSubcats] = useState([]);
  const [subcatIds, setSubcatIds] = useState([]);
  const [defaultSubcatIds, setDefaultSubcatIds] = useState([]);

  //ingredient
  const [ingredients, setIngredients] = useState([]);
  const [ingredientIds, setIngredientIds] = useState([]);
  const [defaultIngredientIds, setDefaultIngredientIds] = useState([]);

  //formortype
  const [formtypes, setFormtypes] = useState([]);
  const [formtypeIds, setFormtypeIds] = useState([]);
  const [defaultFormtypeIds, setDefaultFormtypeIds] = useState([]);

  //shipping
  const [ship, setShip] = useState("");

  //   const dispatch = useDispatch();

  //grab search object from Redux store
  let { search } = useSelector((state) => ({ ...state }));
  //now grab the text out of the search reference: const searchReducer = (state = { text: "" }, action)
  let { text } = search;

  //need to show some products by default
  useEffect(() => {
    //fetch categories
    //loadCategories();
    getCategories().then((res) => {
      setCategories(res.data);
      console.log("useEffect getCategories----->", res.data);
      //set default values
      let defcatids = [];
      res.data.map((r) => defcatids.push(r._id));
      setDefaultCatIds(defcatids);
    });
    //load Brands
    getBrands().then((res) => {
      setBrands(res.data);
      console.log("useEffect getCategories----->", res.data);
      //set default values
      let defbrandids = [];
      res.data.map((r) => defbrandids.push(r._id));
      setDefaultBrandIds(defbrandids);
    });
    //load subcategories
    getSubCategories().then((res) => {
      setSubcats(res.data);
      console.log("useEffect getSubCategories----->", res.data);
      //set default values
      let defsubcatids = [];
      res.data.map((r) => defsubcatids.push(r._id));
      setDefaultSubcatIds(defsubcatids);
    });
    //load ingredients
    getIngredients().then((res) => {
      setIngredients(res.data);
      console.log("useEffect getIngredients----->", res.data);
      //set default values
      let defingredientids = [];
      res.data.map((r) => defingredientids.push(r._id));
      setDefaultIngredientIds(defingredientids);
    });
    //load formortypes
    getFormOrTypes().then((res) => {
      setFormtypes(res.data);
      console.log("useEffect getFormOrTypes----->", res.data);
      //set default values
      let defformtypeids = [];
      res.data.map((r) => defformtypeids.push(r._id));
      setDefaultFormtypeIds(defformtypeids);
    });

    loadAllProducts();
  }, []);

  //this is our work horse function
  const fetchProducts = (arg) => {
    console.log("arg", arg);
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  //   const loadCategories = () => {
  //     getCategories().then((res) => setCategories(res.data));
  //   };

  //1. load products on page load (default)
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //2. load products on user Search input
  //   useEffect(() => {
  //     //to prevent too many requests to backend, i.e. everytime text changes we can delay the request
  //     const delayed = setTimeout(() => {
  //       fetchProducts({ query: text });
  //     }, 300);
  //     //return delay to get results
  //     return () => clearTimeout(delayed);

  //     // console.log("load products on user search input", text);
  //     // fetchProducts({ query: text });
  //   }, [text]);

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  //3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    const p = equals(price, [0, 0]) ? defaultPrice : price;
    const c = categoryIds.length > 0 ? categoryIds : defaultCatIds;
    const q = text !== undefined ? text : " ";
    const b = brandIds.length > 0 ? brandIds : defaultBrandIds;
    const sc = subcatIds.length > 0 ? subcatIds : defaultSubcatIds;
    const i = ingredientIds.length > 0 ? ingredientIds : defaultIngredientIds;
    const ft = formtypeIds.length > 0 ? formtypeIds : defaultFormtypeIds;
    const s = ship;
    fetchProducts({
      query: q,
      price: p,
      category: c,
      brand: b,
      subcat: sc,
      ingredient: i,
      formtype: ft,
      ships: s,
    });
  }, [ok, text]);

  const handleSlider = (value) => {
    //clear other filters
    //clear out search in state
    // dispatch({
    //   type: "SEARCH_QUERY",
    //   payload: { text: "" },
    // });
    //clear categories
    //setCategoryIds([]);

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. load products based on category
  //show categories in list of checkbox
  const showCategories = () => (
    <div className="pb-2 pl-4 pr-4">
      <Checkbox.Group
        options={categories.map((c) => ({ label: c.name, value: c._id }))}
        onChange={handleCatCheck}
      />
    </div>
  );

  const showBrands = () => (
    <div className="pb-2 pl-4 pr-4">
      <Checkbox.Group
        options={brands.map((c) => ({ label: c.name, value: c._id }))}
        onChange={handleBrandCheck}
      />
    </div>
  );

  const showShipping = () => (
    <div className="pb-2 pl-4 pr-4">
      <>
        <Radio
          value={"yes"} //this value is in the Product model
          name={"Yes"}
          checked={ship === "yes"}
          onChange={handleShipCheck}
        >
          Yes
        </Radio>
        <Radio
          value={"no"}
          name={"No"}
          checked={ship === "no"}
          onChange={handleShipCheck}
        >
          No
        </Radio>
      </>
    </div>
  );

  const showSubCategories = () => (
    <div className="pb-2 pl-4 pr-4">
      <Checkbox.Group
        options={subcats.map((c) => ({ label: c.name, value: c._id }))}
        onChange={handleSubCatCheck}
      />
    </div>
  );

  const showIngredients = () => (
    <div className="pb-2 pl-4 pr-4">
      <Checkbox.Group
        options={ingredients.map((c) => ({ label: c.name, value: c._id }))}
        onChange={handleIngredientCheck}
      />
    </div>
  );

  const showFormtypes = () => (
    <div className="pb-2 pl-4 pr-4">
      <Checkbox.Group
        options={formtypes.map((c) => ({ label: c.name, value: c._id }))}
        onChange={handleFormtypeCheck}
      />
    </div>
  );

  const handleIngredientCheck = (e) => {
    console.log("handleIngredientCheck e:", e);
    setIngredientIds(e);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  const handleShipCheck = (e) => {
    console.log("handleShipCheck e:", e);
    setShip(e.target.value);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  const handleFormtypeCheck = (e) => {
    console.log("handleFormtypeCheck e:", e);
    setFormtypeIds(e);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  const handleBrandCheck = (e) => {
    console.log("handleBrandCheck e:", e);
    setBrandIds(e);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  //handle check for Category
  const handleCatCheck = (e) => {
    //first clear other filters
    //text
    // dispatch({
    //   type: "SEARCH_QUERY",
    //   payload: { text: "" },
    // });
    //price
    //setPrice([0, 0]);
    //grab the value and put in array of category ids
    console.log("handleCatCheck e:", e);
    setCategoryIds(e);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
    //fetchProducts({ category: e });
    //fetchProducts();
  };

  //handle check for Category
  const handleSubCatCheck = (e) => {
    console.log("handleSubCatCheck e:", e);
    setSubcatIds(e);
    setTimeout(() => {
      setOk(!ok);
    }, 100);
    //fetchProducts({ category: e });
    //fetchProducts();
  };

  //need sidebar
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter Menu</h4>
          <hr />
          {/* {JSON.stringify(defaultCatIds)} */}
          <hr />
          <Menu defaultOpenKeys={["1", "2", "7"]} mode="inline">
            {/* {Price} */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="500"
                />
              </div>
            </SubMenu>
            {/* {Brands} */}
            {/* {JSON.stringify(brandIds)} */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showBrands()}</div>
            </SubMenu>
            {/* {Categories} */}
            {/* {JSON.stringify(categoryIds)} */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
            {/* {SubCategories} */}
            {/* {JSON.stringify(subcatIds)} */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Sub-Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showSubCategories()}</div>
            </SubMenu>
            {/* {FormOrTypes} */}
            {/* {JSON.stringify(formtypeIds)} */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Form/Type
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showFormtypes()}</div>
            </SubMenu>
            {/* {Ingredients} */}
            {/* {JSON.stringify(ingredientIds)} */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Ingredients
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showIngredients()}</div>
            </SubMenu>
            {/* {Ingredients} */}
            {/* {JSON.stringify(ship)} */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <RadarChartOutlined />
                  Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>

        {/**Main Window Below */}
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-primary">Products</h4>
          )}
          {products.length < 1 && <p>No Products Found</p>}

          <div className="row pb-5">
            {products &&
              products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3 mb-3">
                  <ProductCard product={p} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
