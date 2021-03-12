import React from "react";
import PropTypes from "prop-types";
import formatMoney from "../../functions/formatMoney";
import ModalImage from "react-modal-image";
import herbprodimgdefault from "../../images/herb_product.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();

  const handleCountChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return; //this stops function execution in the event that you try to surpass available quantity
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemoveFromCart = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      //splice at index of product to remove and remove that 1 item using splice(index, count_to_remove)
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage
                small={herbprodimgdefault}
                large={herbprodimgdefault}
              />
            )}
          </div>
        </td>
        <td className="text-center">{p.title}</td>
        <td className="text-center">{p.brand.name}</td>
        <td className="text-center">${formatMoney(p.price)}</td>
        <td className="text-center">
          <input
            type="number"
            className="form-control text-center"
            value={p.count}
            onChange={handleCountChange}
          />
        </td>
        <td className="text-center">
          {p.shipping == "yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            className="text-danger pointer"
            onClick={handleRemoveFromCart}
          />
        </td>
      </tr>
    </tbody>
  );
};

ProductCardInCheckout.propTypes = {
  p: PropTypes.any,
};

export default ProductCardInCheckout;
