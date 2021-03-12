import React from "react";
import {
  useSelector,
  // useDispatch
} from "react-redux";
import { Link } from "react-router-dom";
import formatMoney from "../functions/formatMoney";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

//if you use a curly brace in component make sure you use return
const Cart = () => {
  //access redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  //const dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.reduce((currVal, nextVal) => {
      return currVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const saveOrderToDb = () => {};

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Brand</th>
          <th scope="col">Price</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart | {cart.length > 0 ? `${cart.length} Items` : `Nothing Yet!!`}
          </h4>
          {!cart.length ? (
            <p>
              Looks like your cart is empty.{" "}
              <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          <hr />
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${formatMoney(c.count * c.price)}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${formatMoney(calculateTotal())}</b>
          <hr />
          {user
            ? cart.length > 0 && (
                <button
                  onClick={saveOrderToDb} //need to send cart order to database with backend information because users can manipulate local storage
                  className="btn btn-sm btn-primary  mt-2"
                >
                  Proceed to Checkout
                </button>
              )
            : cart.length > 0 && (
                <button className="btn btn-sm btn-primary  mt-2">
                  <Link
                    to={{
                      //this is React Router state not simply React state
                      //(this is checked for on Login page with intended logic same as rating) roleBasedRedirect
                      pathname: "/login",
                      state: { from: "cart" },
                    }}
                  >
                    Login to Checkout
                  </Link>
                </button>
              )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
