import React from "react";
import PropTypes from "prop-types";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase().trim());
  };

  return (
    <input
      type="search"
      placeholder="Search..."
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

LocalSearch.propTypes = {
  keyword: PropTypes.any,
  setKeyword: PropTypes.any,
};

export default LocalSearch;
