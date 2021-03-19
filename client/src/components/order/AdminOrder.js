//this is the Admin order display on AdminDashboard
import React from "react";
import PropTypes from "prop-types";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import formatMoney from "../../functions/formatMoney";

const AdminOrder = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th className="font-weight-bold" scope="col">
            Title
          </th>
          <th className="font-weight-bold" scope="col">
            Price
          </th>
          <th className="font-weight-bold" scope="col">
            Brand
          </th>
          <th className="font-weight-bold" scope="col">
            Count
          </th>
          <th className="font-weight-bold" scope="col">
            Shipping
          </th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td className="font-weight-bold">{p.product.title}</td>
            <td>${formatMoney(p.product.price)}</td>
            <td>{p.product.brand.name}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="m-5 p-3 card">
          <div className="row pb-1">
            <ShowPaymentInfo order={order} showStatus={false} />
          </div>
          <div className="bg-light">
            <div className="row">
              <div className="col-md-4 text-center">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control btn btn-sm btn-block bg-light font-weight-bold"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="not processed" className="text-capitalize">
                    not processed
                  </option>
                  <option value="cash on delivery" className="text-capitalize">
                    cash on delivery
                  </option>
                  <option value="processing" className="text-capitalize">
                    processing
                  </option>
                  <option value="dispatched" className="text-capitalize">
                    dispatched
                  </option>
                  <option value="cancelled" className="text-capitalize">
                    cancelled
                  </option>
                  <option value="completed" className="text-capitalize">
                    completed
                  </option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

AdminOrder.propTypes = {
  orders: PropTypes.any,
  handleStatusChange: PropTypes.func,
};

export default AdminOrder;
