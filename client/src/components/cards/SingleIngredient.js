import React from "react";
import { Card, Tabs } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import herbimgdefault from "../../images/herb.png";
import IngredientListItems from "./IngredientListItems";
import PropTypes from "prop-types";

//THIS IS NOT A PARENT COMPONENT, Used in Product page

//const { Meta } = Card;
const { TabPane } = Tabs;

//this is child component of Product, so Product will send starRating onStarClick function as props
const SingleIngredient = ({ ingredient }) => {
  const { name, description, images } = ingredient;
  return (
    <>
      {/* {JSON.stringify(product)} */}
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {images &&
              images.map((i) => (
                <img
                  className="img-responsive img-fluid "
                  src={i.url}
                  key={i.public_id}
                />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={herbimgdefault}
                //style={{ height: "150px", objectFit: "cover" }}
                className="mb-3 card-image"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key={1}>
            {description && description}
          </TabPane>
          <TabPane tab="Contact" key={3}>
            Contact Consider Herbs at xxx-xxx-xxxx to learn more about this
            product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3 text-center">{name}</h1>

        <Card>
          <IngredientListItems ingredient={ingredient} />
        </Card>
      </div>
    </>
  );
};

SingleIngredient.propTypes = {
  ingredient: PropTypes.any,
};

export default SingleIngredient;
