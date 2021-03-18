import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import {
  useSelector,
  // useDispatch
} from "react-redux";
import { toast } from "react-toastify";
import AdminOrder from "../../components/order/AdminOrder";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token)
      .then((res) => {
        if (res.data.ok) {
          toast.success("Status updated");
          loadOrders();
        }
      })
      .catch((err) => {
        console.log("CART SAVE ERR", err);
        toast.error("Status update ERROR:", err.message);
      });
  };

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log("get orders admin:", JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <AdminOrder orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
