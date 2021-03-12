import axios from "axios";

export const getIngredients = async () =>
  await axios.get(`${process.env.REACT_APP_API}/ingredients`);

export const getIngredient = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/ingredient/${slug}`);

export const removeIngredient = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/ingredient/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateIngredient = async (slug, ingredient, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/ingredient/${slug}`,
    ingredient,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createIngredient = async (ingredient, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/ingredient`, ingredient, {
    headers: {
      authtoken,
    },
  });

export const getIngredientsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/ingredients/${count}`);
