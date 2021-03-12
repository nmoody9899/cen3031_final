import React from "react";
import PropTypes from "prop-types";

const IngredientCreateForm = ({ handleSubmit, handleChange, values }) => {
  //destructure values from state
  const {
    name, //text
    description, //text
    //image array
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
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

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

IngredientCreateForm.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  values: PropTypes.any,
};

export default IngredientCreateForm;
