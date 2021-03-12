import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory(); //need this to use History
  let { slug } = useParams();

  //console.log("params", slug);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` }, //this is react-router-dom state!!
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for the review. It will appear soon!");
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

RatingModal.propTypes = {
  children: PropTypes.any,
};

export default RatingModal;
