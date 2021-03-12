const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//trim used to trim whitespace when user queries

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Category name too short"],
      maxlength: [32, "Category name too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true, //make sure it is all lowercase
      index: true, //query help
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
