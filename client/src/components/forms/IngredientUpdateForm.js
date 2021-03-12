import React from "react";
import PropTypes from "prop-types";
//import { useState } from "react";

const IngredientUpdateForm = ({ handleSubmit, handleChange, values }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          defaultValue={values.name}
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
          defaultValue={values.description}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

IngredientUpdateForm.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  values: PropTypes.any,
};

export default IngredientUpdateForm;
