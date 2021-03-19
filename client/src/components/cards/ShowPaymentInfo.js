import React from "react";
import PropTypes from "prop-types";
//import formatMoney from "../../functions/formatMoney";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div className="container pb-3">
      <div className="col">
        <div className="row">
          <div className="col-md-4 text-left">
            <p>
              <span>
                {" "}
                <span className="font-weight-bold">Order ID:</span>{" "}
                {order.paymentIntent.id}
              </span>{" "}
              <span>
                <span className="font-weight-bold">Ordered On:</span>{" "}
                {new Date(order.paymentIntent.created * 1000).toLocaleString()}
              </span>
              {"  "}
            </p>
            {showStatus && (
              <p>
                <span className="badge bg-primary text-white btn btn-md btn-block">
                  <span className="font-weight-bold">Order Status:</span>{" "}
                  {order.orderStatus}
                </span>
                {"  "}
              </p>
            )}
          </div>
          <div className="col-md-8 text-right">
            <p>
              <span>
                <span className="font-weight-bold">Payment Method:</span>{" "}
                {order.paymentIntent.payment_method_types[0]}
              </span>{" "}
              <span>
                <span className="font-weight-bold">Payment:</span>{" "}
                {order.paymentIntent.status.toUpperCase()}
              </span>
              {"  "}
            </p>
            <p>
              <span>
                <span className="font-weight-bold">Currency:</span>{" "}
                {order.paymentIntent.currency.toUpperCase()}
              </span>
              {"  "}
              <span>
                <span className="font-weight-bold">Amount:</span>{" "}
                {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ShowPaymentInfo.propTypes = {
  order: PropTypes.any,
  showStatus: PropTypes.bool,
};

export default ShowPaymentInfo;
