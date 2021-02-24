const mongoose = require("mongoose");

//trim used to trim whitespace when user queries

const categorySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
