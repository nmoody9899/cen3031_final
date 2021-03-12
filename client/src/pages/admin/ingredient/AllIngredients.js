import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getIngredientsByCount } from "../../../functions/ingredient";
import AdminIngredientCard from "../../../components/cards/AdminIngredientCard";
import { removeIngredient } from "../../../functions/ingredient";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllIngredients();
  }, []);

  const loadAllIngredients = () => {
    setLoading(true);
    getIngredientsByCount(100)
      .then((res) => {
        setIngredients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      console.log("send delete request", slug);
      removeIngredient(slug, user.token)
        .then((res) => {
          loadAllIngredients();
          toast.error(`${res.data.name} has been deleted`);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Ingredients</h4>
          )}
          <div className="row">
            {ingredients.map((ingredient) => (
              <div className="col-md-4 pb-3" key={ingredient._id}>
                <AdminIngredientCard
                  ingredient={ingredient}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
