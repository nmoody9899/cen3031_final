import React from "react";
import PropTypes from "prop-types";

const BrandForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Brand Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter New Brand..."
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

BrandForm.propTypes = {
  handleSubmit: PropTypes.any,
  setName: PropTypes.any,
  name: PropTypes.any,
};

export default BrandForm;
