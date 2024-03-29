import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import herbprodimgdefault from "../../images/herb_product.png";
import ProductListItems from "./ProductListItems";
import PropTypes from "prop-types";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverageRating } from "../../functions/rating";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { addToUserWishlist } from "../../functions/user";
import { toast } from "react-toastify";

//THIS IS NOT A PARENT COMPONENT, Used in Product page

//const { Meta } = Card;
const { TabPane } = Tabs;

//this is child component of Product, so Product will send starRating onStarClick function as props
const SingleProduct = ({ product, onStarClick, star }) => {
  const history = useHistory();
  const { title, description, images, ingredient, _id } = product;

  const [tooltip, setTooltip] = useState("Click to Add Item to Cart");
  const [tooltipWish] = useState("Save to Wishlist for Another Time?");
  //redux state dispatch
  const { user } = useSelector((state) => ({ ...state }));
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
      console.log("cart before push product:", cart);
      //push new product object to cart
      cart.push({
        ...product, //spread to get values as part of product
        count: 1, //add a count property
      });
      console.log("cart after push product:", cart);
      //make sure we don't save duplicates using lodash helper
      //let unique = _.uniqWith(cart, _.isEqual);
      let unique = _.uniqBy(cart, (i) => JSON.stringify([i._id]));
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    //we are in a single product view so have product as props
    addToUserWishlist(product._id, user.token).then((res) => {
      if (res.data.ok) {
        toast.success("Added to wishlist");
        history.push("/user/wishlist");
      }
    });
    // .catch((err) => {
    //   console.log(err);
    //   toast.error("Error adding to wishlist:", err.message);
    // });
  };

  return (
    <>
      {/* {JSON.stringify(product)} */}
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {images &&
              images.map((i) => (
                <img
                  className="img-responsive img-fluid "
                  src={i.url}
                  key={i.public_id}
                />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={herbprodimgdefault}
                //style={{ height: "150px", objectFit: "cover" }}
                className="mb-3 card-image"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key={1}>
            {description && description}
          </TabPane>
          <TabPane tab="Ingredients" key={2}>
            <ul className="list-group">
              {ingredient && (
                <li className="list-group-item">
                  {ingredient.map((s) => (
                    <Link
                      to={`/ingredient/${s.slug}`}
                      key={s._id}
                      className="label label-default label-pill pull-xs-right"
                    >
                      {s.name}
                    </Link>
                  ))}
                </li>
              )}
            </ul>
          </TabPane>
          <TabPane tab="Contact" key={3}>
            Contact Consider Herbs at xxx-xxx-xxxx to learn more about this
            product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3 text-center">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverageRating(product)
        ) : (
          <div className="text-center pt-1 pb-3">
            Be the first to leave a rating...
          </div>
        )}

        <Card
          actions={[
            <Tooltip key={1} title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                {product.quantity < 1 ? (
                  <>
                    <InfoCircleOutlined className="text-danger" /> <br /> Out of
                    Stock
                  </>
                ) : (
                  <>
                    <ShoppingCartOutlined className="text-success" /> <br /> Add
                    To Cart
                  </>
                )}
              </a>
              ,
            </Tooltip>,
            <Tooltip key={2} title={tooltipWish}>
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className="text-info" /> <br />
                Add to Wishlist
              </a>
            </Tooltip>,
            <RatingModal key={3}>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                //MOVED TO PRODUCT page which is PARENT COMPONENT
                // changeRating={(newRating, name) =>
                //   console.log("newRating", newRating, "name", name)
                // }
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="#b03a1e"
                // starHoverColor="#6b9b3c"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

SingleProduct.propTypes = {
  product: PropTypes.any,
  onStarClick: PropTypes.any,
  star: PropTypes.any,
};

export default SingleProduct;
