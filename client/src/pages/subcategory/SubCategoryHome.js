import React, { useEffect, useState } from "react";
import { getSubCategory } from "../../functions/subcategory";
// import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import PropTypes from "prop-types";

//match from react-router props
const SubCategoryHome = ({ match }) => {
  //category
  const [subCategory, setSubCategory] = useState({});
  //list of products for same category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      //   console.log(loading);
      //   console.log(category);
      setSubCategory(res.data.subcategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : products.length ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Sub Category <u>{subCategory.name}</u> has {products.length}{" "}
              Products
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Sorry. Check Back Soon for Products in <u>{subCategory.name}</u>{" "}
              Sub Category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

SubCategoryHome.propTypes = {
  match: PropTypes.any,
};

export default SubCategoryHome;
