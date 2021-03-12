import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subcategory";

const SubCategoryList = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //make request to get all categories
    getSubCategories().then((c) => {
      setSubCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showSubCategories = () =>
    subcategories.map((s) => (
      <div
        key={s._id}
        className="col btn btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/subcategory/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showSubCategories()
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
