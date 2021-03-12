import React, { useEffect, useState } from "react";
import { getBrand } from "../../functions/brand";
import ProductCard from "../../components/cards/ProductCard";
import PropTypes from "prop-types";

//match from react-router props
const BrandHome = ({ match }) => {
  //category
  const [brand, setBrand] = useState({});
  //list of products for same category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getBrand(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      //   console.log(loading);
      //   console.log(category);
      setBrand(res.data.brand);
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
              Brand <u>{brand.name}</u> offers {products.length} Products
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Sorry. Check Back Soon for Products from <u>{brand.name}</u>{" "}
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

BrandHome.propTypes = {
  match: PropTypes.any,
};

export default BrandHome;
