module.exports = {
  plugins: ["jest", "react"],
  extends: ["plugin:jest/recommended", "plugin:react/recommended"],
  env: {
    "jest/globals": true,
  },
  settings: {
    version: "detect",
  },
};
