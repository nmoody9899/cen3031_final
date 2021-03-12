import React from "react";
import PropTypes from "prop-types";

const UnitOfMeasureForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Unit of Measure</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter New Unit of Measure..."
        autoFocus
        required
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

UnitOfMeasureForm.propTypes = {
  handleSubmit: PropTypes.any,
  setName: PropTypes.any,
  name: PropTypes.any,
};

export default UnitOfMeasureForm;
