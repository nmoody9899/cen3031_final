const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//trim used to trim whitespace when user queries

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Ingredient name too short"],
      maxlength: [32, "Ingredient name too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true, //make sure it is all lowercase
      index: true, //query help
    },
    description: {
      type: String,
      required: true,
      maxlength: 2048,
      text: true, //search database using description
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
