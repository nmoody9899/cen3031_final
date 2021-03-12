import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatMoney from "../../functions/formatMoney";

/**
 *price 
 *category
 subcategory
 formortype
 quantity
 sold
 images
 shipping
 size
 unitofmeasure
 brand
 ingredient
 */

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    //slug,
    subcategory,
    formortype,
    size,
    unitofmeasure,
    quantity,
    sold,
    shipping,
    brand,
    //ingredient,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {formatMoney(price)}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subcategory && (
        <li className="list-group-item">
          Sub Categories
          {subcategory.map((s) => (
            <Link
              to={`/subcategory/${s.slug}`}
              key={s._id}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      {formortype && (
        <li className="list-group-item">
          Form/Type
          <span className="label label-default label-pill pull-xs-right">
            {formortype.name}
          </span>
        </li>
      )}
      {unitofmeasure && (
        <li className="list-group-item">
          Size
          <span className="label label-default label-pill pull-xs-right">
            {size} {unitofmeasure.name}
          </span>
        </li>
      )}
      {/* {unitofmeasure && (
        <li className="list-group-item">
          Units
          <span className="label label-default label-pill pull-xs-right">
            {unitofmeasure.name}
          </span>
        </li>
      )} */}
      <li className="list-group-item">
        Quantity in Stock
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Number Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
      <li className="list-group-item">
        Shipping Offered
        <span className="label label-default label-pill pull-xs-right">
          {shipping == "yes" ? "Yes" : "No"}
        </span>
      </li>
      {brand && (
        <li className="list-group-item">
          Brand
          <Link
            to={`/brand/${brand.slug}`}
            key={brand._id}
            className="label label-default label-pill pull-xs-right"
          >
            {brand.name}
          </Link>
        </li>
      )}
      {/* {ingredient && (
        <li className="list-group-item">
          Main Ingredients
          {ingredient.map((s) => (
            <Link
              to={`/ingredient/${s.slug}`}
              key={s._id}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )} */}
    </ul>
  );
};

ProductListItems.propTypes = {
  product: PropTypes.any,
};

export default ProductListItems;
