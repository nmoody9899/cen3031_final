import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import herbimgdefault from "../../images/herb.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminIngredientCard = ({ ingredient, handleRemove }) => {
  //destructure
  const { name, description, images, slug } = ingredient;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : herbimgdefault}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/ingredient/${slug}`} key={1}>
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
        title={name}
        description={`${description && description.substring(0, 32)}...`}
      />
    </Card>
  );
};

AdminIngredientCard.propTypes = {
  ingredient: PropTypes.any,
  handleRemove: PropTypes.any,
};

export default AdminIngredientCard;
