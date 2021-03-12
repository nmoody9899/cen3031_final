import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import herbprodimgdefault from "../../images/herb_product.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  //destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : herbprodimgdefault}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link key={1} to={`/admin/product/${slug}`}>
          <EditOutlined className="text-primary" />
        </Link>,
        <DeleteOutlined
          key={2}
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 32)}...`}
      />
    </Card>
  );
};

AdminProductCard.propTypes = {
  product: PropTypes.any,
  handleRemove: PropTypes.any,
};

export default AdminProductCard;
