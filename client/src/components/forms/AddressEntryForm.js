import React from "react";
import PropTypes from "prop-types";

const AddressEntryForm = ({ handleSubmit, handleChange, address }) => {
  //destructure values from state
  const {
    street, //text
    city, //text
    state, //number
    zip, //array
  } = address;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Street</label>
        <input
          type="text"
          name="street"
          className="form-control"
          value={street}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          name="state"
          className="form-control"
          value={state}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zip</label>
        <input
          type="text"
          name="zip"
          className="form-control"
          value={zip}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-outline-info mt-2">Save</button>
    </form>
  );
};

AddressEntryForm.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  address: PropTypes.any,
};

export default AddressEntryForm;
