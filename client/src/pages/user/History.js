//this is the user dashboard, and it will be part of a protected route like
//done with Login and Register when user is logged in
import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import {
  useSelector,
  // , useDispatch
} from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";
import formatMoney from "../../functions/formatMoney";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state })); //this is in redux state

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(
        "user orders returned -----> ",
        JSON.stringify(res.data, null, 4)
      );
      setOrders(res.data);
    });
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

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

  const showOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>{order.createdAt}</p>
        <p>Show payment info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF DOWNLOAD</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          {orders.length > 0 ? (
            <h4>User purchase orders</h4>
          ) : (
            <h4>Make your first purchase today!</h4>
          )}
          {showOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
