import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import formatMoney from "../functions/formatMoney";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
//import ReactQuill from "react-quill";
import AddressEntryForm from "../components/forms/AddressEntryForm";
import PropTypes from "prop-types";

const initialAddressState = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

const Checkout = ({ history }) => {
  //Checkout is a page so we have access to history from props (console.log props if interested)
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(initialAddressState);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountErr, setDiscountErr] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart response", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products); //this is found in controller when returning products, cartTotal, totalAfterDiscount
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = (e) => {
    e.preventDefault();
    console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };

  const handleEmptyUserCart = () => {
    //cart needs to be emptied in three places (localStorage, redux state, database)
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //remove from backend
    emptyUserCart(user.token).then((res) => {
      console.log(res);
      setProducts([]); //clear out products in state
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart has been emptied. Continue shopping.");
    });
  };

  //on handle change only one item at a time will be updated, so all form fields can use it!
  const handleChange = (e) => {
    //
    //console.log(e.target.name);
    setAddress({ ...address, [e.target.name]: e.target.value });
    //console.log(e.target.name, "=====", e.target.value);
  };

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} x ({p.count}) ={" "}
          {formatMoney(p.product.price * p.count)}
        </p>
      </div>
    ));
  };

  const handleCouponApply = () => {
    //console.log("COUPON TO CHECK AND APPLY", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux coupon applied to show whether coupon applied
        dispatch({
          type: "COUPON_APPLIED", //<--- from couponReducer
          payload: true,
        });
      }
      //error
      if (res.data.err) {
        setDiscountErr(res.data.err);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED", //<--- from couponReducer
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => {
    return (
      <>
        {/* {JSON.stringify(totalAfterDiscount)} */}
        {/* JSON.stringify(discountErr)} */}
        {/* {JSON.stringify(props, null, 4)} */}

        <input
          className="form-control"
          type="text"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountErr("");
          }}
        />
        <button className="btn btn-primary mt-2" onClick={handleCouponApply}>
          Apply
        </button>
        <br />
        <div>
          {discountErr && <p className="bg-danger pt-2">{discountErr}</p>}
        </div>
      </>
    );
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <AddressEntryForm
          handleSubmit={saveAddressToDb}
          handleChange={handleChange}
          address={address}
        />
        {/* <ReactQuill theme="snow" defaultValue={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button> */}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${formatMoney(total)}</p>
        {totalAfterDiscount > 0 && (
          <p className="bg-success">
            Discount Applied! New Total: ${formatMoney(totalAfterDiscount)}
          </p>
        )}
        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!addressSaved || !products.length}
              className="btn btn-primary mt-2"
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={handleEmptyUserCart}
              className="btn btn-primary mt-2"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  history: PropTypes.any,
};

export default Checkout;
