import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripe/StripeCheckout";
import "../stripe.css";

//load stripe outside component render to avoid recreating stripe object on every render
const promiseStripe = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container-fluid p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promiseStripe}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
