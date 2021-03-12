import React from "react";
import PropTypes from "prop-types";

const FormOrTypeForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Form Or Type</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter New Form or Type..."
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

FormOrTypeForm.propTypes = {
  handleSubmit: PropTypes.any,
  setName: PropTypes.any,
  name: PropTypes.any,
};

export default FormOrTypeForm;
