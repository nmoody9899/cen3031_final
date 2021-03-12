import React from "react";
import { Select } from "antd";
const { Option } = Select;
import PropTypes from "prop-types";

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  handleBrandChange,
  handleFormOrTypeChange,
  handleUnitOfMeasureChange,
  loadCategories,
  loadHerbList,
  loadBrands,
  loadFormOrTypes,
  loadUnitOfMeasures,
  subOptions,
  //setShowSub,
  showSub,
}) => {
  //destructure values from state
  const {
    title, //text
    description, //text
    price, //number
    categories, //array
    formsortypes,
    //formortype,
    //category, //text
    herbList,
    ingredient,
    subcategory, //array
    quantity, //number
    // image, //array
    shipping, //enum
    //sizes, //enum menu populate (size now number not 'small','medium','large')
    size, //text
    unitofmeasures, //array
    //unit, //text
    brands, //menu populate
    //brand, //text
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
          autoFocus
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
        <label>Form or Type</label>
        <select
          name="formortype"
          className="form-control"
          onChange={handleFormOrTypeChange}
          onMouseOverCapture={loadFormOrTypes}
          //defaultValue={brand}
        >
          <option>Choose Form or Type...</option>
          {formsortypes.length > 0 &&
            formsortypes.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
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
        <input
          type="number"
          name="size"
          className="form-control"
          value={size}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Unit of Measure</label>
        <select
          name="unitofmeasure"
          className="form-control"
          onChange={handleUnitOfMeasureChange}
          onMouseOverCapture={loadUnitOfMeasures}
          //defaultValue={brand}
        >
          <option>Choose Unit of Measure...</option>
          {unitofmeasures.length > 0 &&
            unitofmeasures.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
        </select>
      </div>

      {/*JSON.stringify(brands)*/}

      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
          onMouseOverCapture={loadBrands}
          //defaultValue={brand}
        >
          <option>Choose Brand...</option>
          {brands.length > 0 &&
            brands.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      {/*JSON.stringify(values.categories)*/}
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          onMouseOverCapture={loadCategories}
          //defaultValue={category}
        >
          <option>Choose Category...</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <br />

      {showSub && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select one or more subcategories..."
            value={subcategory}
            //name="subcategory"
            onChange={(value) => setValues({ ...values, subcategory: value })}
          >
            {subOptions.length &&
              subOptions.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <br />

      <div>
        <label>Main Ingredients</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select one or more main ingredients..."
          onMouseOverCapture={loadHerbList}
          value={ingredient}
          //name="subcategory"
          onChange={(value) => setValues({ ...values, ingredient: value })}
        >
          {herbList.length &&
            herbList.map((i) => (
              <Option key={i._id} value={i._id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

ProductCreateForm.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  values: PropTypes.any,
  setValues: PropTypes.any,
  handleCategoryChange: PropTypes.any,
  handleBrandChange: PropTypes.any,
  handleFormOrTypeChange: PropTypes.any,
  handleUnitOfMeasureChange: PropTypes.any,
  loadCategories: PropTypes.any,
  loadHerbList: PropTypes.any,
  loadBrands: PropTypes.any,
  loadFormOrTypes: PropTypes.any,
  loadUnitOfMeasures: PropTypes.any,
  subOptions: PropTypes.any,
  showSub: PropTypes.any,
};

export default ProductCreateForm;
