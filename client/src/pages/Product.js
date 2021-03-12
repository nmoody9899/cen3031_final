import React, { useEffect, useState } from "react";
import { getProduct, starProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getRelatedByCat } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { slug } = match.params;

  //redux user
  const { user } = useSelector((state) => ({ ...state }));

  //need to check to see if the product has a review from the current user and show that value

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      //who is updating?
      //check if currently logged in user has already added rating to this product
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); //current user's star value for this product
    }
  });

  const onStarClick = (newRating, name) => {
    //console.table(newRating, name);
    setStar(newRating);
    //takes productId, star, user token
    starProduct(name, newRating, user.token).then((res) => {
      console.log("Rating clicked:", res.data);
      loadSingleProduct(); //to show rating in real-time for user
    });
  };

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      //load related also
      getRelatedByCat(res.data._id).then((res) => setRelated(res.data));
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          onStarClick={onStarClick}
          product={product}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h1>Related Products</h1>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related && related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col h2">No related products yet!</div>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  match: PropTypes.any,
};

export default Product;
