import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBrands } from "../../functions/brand";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //make request to get all categories
    getBrands().then((b) => {
      setBrands(b.data);
      setLoading(false);
    });
  }, []);

  const showBrands = () =>
    brands.map((b) => (
      <div
        key={b._id}
        className="col btn btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/brand/${b.slug}`}>{b.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showBrands()}
      </div>
    </div>
  );
};

export default BrandList;
