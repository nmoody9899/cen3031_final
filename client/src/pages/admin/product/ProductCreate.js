import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategory: [],
  quantity: "",
  image: [],
  shipping: "no",
  sizes: ["small", "medium", "large"], //menu populate
  brands: ["Consider Herbs", "Partner 1", "Partner 2"], //menu populate
  size: "medium",
  brand: "Consider Herbs",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  //destructure values from state
  const {
    title, //text
    description, //text
    price, //number
    //categories, //array
    //category, //text
    //subcategory, //array
    quantity, //number
    // image, //array
    shipping, //enum
    sizes, //enum menu populate
    brands, //enum menu populate
    size, //text
    brand, //text
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        //toast.success(`New product "${res.data.title}" created!`);
        window.alert(`New product "${res.data.title}" created!`);
        window.location.reload();
      })
      .catch((err) => {
        //console.log(err.response.data);
        if (err.response.status === 400) {
          toast.error(err.response.data);
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Create Product</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="custom-select"
                onChange={handleChange}
                defaultValue={shipping}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Size</label>
              <select
                name="size"
                className="custom-select"
                onChange={handleChange}
                defaultValue={size}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="custom-select"
                onChange={handleChange}
                defaultValue={brand}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
