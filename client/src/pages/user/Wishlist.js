import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserWishlist, removeFromUserWishlist } from "../../functions/user";
import {
  useSelector,
  // , useDispatch
} from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () =>
    getUserWishlist(user.token).then((res) => {
      console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemoveFromWishlist = (productId) => {
    removeFromUserWishlist(productId, user.token).then((res) => {
      if (res.data.ok) {
        loadWishList();
        toast.error(`Removed item from wishlist!`);
      }
    });
  };

  return (
    <div className="container-fluid">
      {/* {JSON.stringify(wishlist, null, 4)} */}
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {wishlist.map((prod) => (
            <div key={prod._id} className="alert alert-secondary">
              <Link to={`/product/${prod.slug}`}>{prod.title}</Link>
              <span
                onClick={() => handleRemoveFromWishlist(prod._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
