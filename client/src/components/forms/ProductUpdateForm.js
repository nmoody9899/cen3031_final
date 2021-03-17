import React from "react";
import { Select } from "antd";
const { Option } = Select;
import PropTypes from "prop-types";

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  //setValues,
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
  //subIngredientOptions,
  //setSubIngredientOptions,
  //   //setShowSub,
  //   showSub,
  arrayOfSubcategoryIds,
  setArrayOfSubcategoryIds,
  arrayOfIngredientIds,
  setArrayOfIngredientIds,
  selectedCategory,
}) => {
  //destructure values from state
  const {
    title, //text
    description, //text
    price, //number
    categories, //array
    formsortypes,
    formortype,
    category, //text
    herbList,
    //ingredient,
    //subcategory, //array
    quantity, //number
    // image, //array
    shipping, //enum
    //sizes, //enum menu populate (size now number not 'small','medium','large')
    size, //text
    unitofmeasures, //array
    unitofmeasure, //text
    brands, //menu populate
    brand, //text
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
          onMouseMove={loadFormOrTypes}
          value={formortype._id}
        >
          <option>
            {formortype
              ? `Current: ${formortype.name}. Select item below to replace...`
              : "Please select..."}
          </option>
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
          value={shipping}
          name="shipping"
          className="custom-select"
          onChange={handleChange}
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

      <div className="form-group" onMouseOverCapture={loadUnitOfMeasures}>
        <label>Unit of Measure</label>
        <select
          name="unitofmeasure"
          className="form-control"
          onChange={handleUnitOfMeasureChange}
          //defaultValue={unitofmeasure}
          value={unitofmeasure._id}
        >
          <option>
            {unitofmeasure
              ? `Current: ${unitofmeasure.name}. Select item below to replace...`
              : "Please select..."}
          </option>
          {unitofmeasures.length > 0 &&
            unitofmeasures.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
        </select>
      </div>

      {/* {JSON.stringify(brand)} */}

      <div className="form-group" onMouseOverCapture={loadBrands}>
        <label>Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
          value={brand._id}
        >
          <option>
            {brand
              ? `Current: ${brand.name}. Select item below to replace...`
              : "Please select..."}
          </option>
          {brands.length > 0 &&
            brands.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      {/* {JSON.stringify(category)} */}
      <div className="form-group" onMouseOverCapture={loadCategories}>
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          <option>
            {category
              ? `Current: ${category.name}. Select item below to replace...`
              : "Please select..."}
          </option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <br />

      {/* {JSON.stringify(subcategory)} */}
      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select one or more subcategories..."
          value={arrayOfSubcategoryIds}
          //name="subcategory"
          onChange={(value) => setArrayOfSubcategoryIds(value)}
        >
          {subOptions.length &&
            subOptions.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />

      {/* {JSON.stringify(ingredient)} */}
      <div onMouseMoveCapture={loadHerbList}>
        <label>Main Ingredients</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select one or more main ingredients..."
          value={arrayOfIngredientIds}
          //name="subcategory"
          onChange={(value) => setArrayOfIngredientIds(value)}
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

ProductUpdateForm.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  values: PropTypes.any,
  //setValues: PropTypes.any,
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
  //   showSub: PropTypes.any,
  arrayOfSubcategoryIds: PropTypes.any,
  setArrayOfSubcategoryIds: PropTypes.any,
  arrayOfIngredientIds: PropTypes.any,
  setArrayOfIngredientIds: PropTypes.any,
  subIngredientOptions: PropTypes.any,
  setSubIngredientOptions: PropTypes.any,
  selectedCategory: PropTypes.any,
};

export default ProductUpdateForm;
