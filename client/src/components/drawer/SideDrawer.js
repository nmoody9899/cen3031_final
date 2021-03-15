import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import herbprodimgdefault from "../../images/herb_product.png";
import PropTypes from "prop-types";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const imgStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart | ${cart.length} Items`}
      placement="right"
      //closeable="false" //hide close icon
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images.length ? (
              <>
                <img style={imgStyle} src={p.images[0].url} />
                <p className="text-center bg-secondary text-light">
                  {p.title} ({p.count})
                </p>
              </>
            ) : (
              <>
                <img style={imgStyle} src={herbprodimgdefault} />
                <p className="text-center bg-secondary text-light">
                  {p.title} ({p.count})
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <Button
          className="text-center btn btn-primary btn-raised btn-block"
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  children: PropTypes.any,
};

export default SideDrawer;
