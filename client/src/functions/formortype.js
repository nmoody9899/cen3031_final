import axios from "axios";

export const getFormOrTypes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/formortypes`);

export const getFormOrType = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/formortype/${slug}`);

export const removeFormOrType = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/formortype/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateFormOrType = async (slug, formortype, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/formortype/${slug}`,
    formortype,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createFormOrType = async (formortype, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/formortype`, formortype, {
    headers: {
      authtoken,
    },
  });

export const getFormOrTypeUnits = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/formortype/unitofmeasures/${_id}`
  );
