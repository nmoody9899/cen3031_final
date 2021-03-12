import React, { useEffect, useState } from "react";
import { getIngredient } from "../../functions/ingredient";
import SingleIngredient from "../../components/cards/SingleIngredient";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

const Ingredient = ({ match }) => {
  const [ingredient, setIngredient] = useState({});

  const { slug } = match.params;

  //redux user
  //   const { user } = useSelector((state) => ({ ...state }));

  //need to check to see if the product has a review from the current user and show that value

  useEffect(() => {
    loadSingleIngredient();
  }, [slug]);

  const loadSingleIngredient = () => {
    getIngredient(slug).then((res) => {
      setIngredient(res.data);
      //load related also
      //getRelatedByCat(res.data._id).then((res) => setRelated(res.data));
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleIngredient ingredient={ingredient} />
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  match: PropTypes.any,
};

export default Ingredient;
