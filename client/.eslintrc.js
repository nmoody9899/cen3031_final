//.eslintrc.js
module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    version: "detect",
  },
  env: {
    node: true,
  },
  rules: {
    "comma-dangle": ["error", "only-multiline"],
  },
};
