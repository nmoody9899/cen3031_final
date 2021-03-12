import React, { useState } from "react";
import PropTypes from "prop-types";
import herbprodimgdefault from "../../images/herb_product.png";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;
import { showAverageRating } from "../../functions/rating";
import StarRating from "react-star-ratings";
import formatMoney from "../../functions/formatMoney";
import _ from "lodash";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  //destructure
  const { title, description, images, price, slug } = product;

  const [tooltip, setTooltip] = useState("Click to Add Item to Cart");

  //redux state dispatch
  //const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    //create cart array to save in local storage
    let cart = [];
    if (typeof window !== "undefined") {
      //this means window object is available so local storage is available
      //if cart is in local storage get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart")); //need to get data as JSON object
      }
      //otherwise create one
      //push new product object to cart
      cart.push({
        ...product, //spread to get values as part of product
        count: 1, //add a count property
      });
      //make sure we don't save duplicates using lodash helper
      let unique = _.uniqWith(cart, _.isEqual);
      console.log("unique", unique);
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      //show tooltip
      setTooltip("Added");
      //add cart to redux (see cartReducer which grabs this stuff from localStorage [use Browser tools inspect to check Application Local Storage and Redux])
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverageRating(product)
      ) : (
        // <div className="text-center pt-1 pb-3">No rating...</div>
        <div className="text-center pt-1 pb-3">
          <span>
            <StarRating
              rating={0}
              starDimension="20px"
              starSpacing="2px"
              numberOfStars={5}
              editing={false}
            />
          </span>
        </div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : herbprodimgdefault}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1 img-fluid img-responsive"
          />
        }
        actions={[
          <Link key={1} to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br /> View Product
          </Link>,
          <Tooltip key={2} title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined key={2} className="text-success" /> <br />{" "}
              Add to Cart
            </a>
            ,
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${formatMoney(price)}`}
          description={`${description && description.substring(0, 32)}...`}
        />
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.any,
};

export default ProductCard;
