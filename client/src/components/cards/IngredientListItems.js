import React from "react";
import PropTypes from "prop-types";

/**
 *name
 description
 */

const IngredientListItems = ({ ingredient }) => {
  const { name, description } = ingredient;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Name{" "}
        <span className="label label-default label-pill pull-xs-right">
          {name}
        </span>
      </li>
      {description && (
        <li className="list-group-item">
          Description
          <span className="label label-default label-pill pull-xs-right">
            {description}
          </span>
        </li>
      )}
    </ul>
  );
};

IngredientListItems.propTypes = {
  ingredient: PropTypes.any,
};

export default IngredientListItems;
