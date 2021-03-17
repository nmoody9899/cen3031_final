import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "antd";
import {
  DollarCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import chimgdefault from "../../images/considerherbs.jpg";
import formatMoney from "../../functions/formatMoney";
import { createOrder, emptyUserCart } from "../../functions/user";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  //when component mounts make request to backend to get secret
  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent res.data", res.data);
      setClientSecret(res.data.clientSecret);
      //additional response items received after successful payment (check stripe controllers payment intent for res.json(...))
      //these could also be destructured from res.data
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    // console.log("handle submit e", e);
    e.preventDefault(); //don't reload page after clicking pay
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          //empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          //empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          //reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          //empty cart in database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      //history.push("/user/history");
    }
  };

  const handleChange = async (e) => {
    // console.log("handle change e", e);
    //listen for changes in card element and display
    //any errors as customer types card details
    setDisabled(e.empty); //disable pay button if errors
    setError(e.error ? e.error.message : ""); //show error message
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {/* {JSON.stringify(cartTotal)}
      {JSON.stringify(totalAfterDiscount)}
      {JSON.stringify(payable)} */}
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">Coupon Applied</p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied</p>
          )}
        </div>
      )}

      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={chimgdefault}
              style={{
                height: "250px",
                objectFit: "scale-down",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarCircleOutlined className="text-info" /> <br /> Total: $
              {formatMoney(cartTotal)}
            </>,

            !succeeded &&
              (coupon && totalAfterDiscount !== undefined ? (
                <>
                  <MinusCircleOutlined className="text-success" /> <br />{" "}
                  Discount: ${formatMoney(cartTotal - totalAfterDiscount)}
                </>
              ) : (
                <>
                  <MinusCircleOutlined className="text-danger" />
                </>
              )),
            <>
              <CheckCircleOutlined className="text-info" /> <br /> Total
              Payable: ${formatMoney(payable)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

StripeCheckout.propTypes = {
  history: PropTypes.any,
};

export default StripeCheckout;
