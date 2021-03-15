import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import formatMoney from "../functions/formatMoney";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
//import ReactQuill from "react-quill";
import AddressEntryForm from "../components/forms/AddressEntryForm";

const initialAddressState = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(initialAddressState);
  const [addressSaved, setAddressSaved] = useState(false);

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
        coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} x ({p.count}) ={" "}
              {formatMoney(p.product.price * p.count)}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${formatMoney(total)}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!addressSaved || !products.length}
              className="btn btn-primary mt-2"
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

export default Checkout;
