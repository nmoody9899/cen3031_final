import React from "react";
import { Link } from "react-router-dom";

//className from Bootstrap

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>
      <li>
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>
      <li>
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>
      <li>
        <Link to="/admin/subcategory" className="nav-link">
          Sub Category
        </Link>
      </li>
      <li>
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>
      <li>
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
