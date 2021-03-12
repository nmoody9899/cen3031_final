import axios from "axios";

export const getUnitOfMeasures = async () =>
  await axios.get(`${process.env.REACT_APP_API}/unitofmeasures`);

export const getUnitOfMeasure = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/unitofmeasure/${slug}`);

export const removeUnitOfMeasure = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/unitofmeasure/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateUnitOfMeasure = async (slug, unitofmeasure, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/unitofmeasure/${slug}`,
    unitofmeasure,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createUnitOfMeasure = async (unitofmeasure, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/unitofmeasure`,
    unitofmeasure,
    {
      headers: {
        authtoken,
      },
    }
  );
