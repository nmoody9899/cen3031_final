const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true, //search database using title
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true, //query database based on slug
    },
    description: {
      type: String,
      required: true,
      maxlength: 2048,
      text: true, //search database using description
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    // category: {
    //   type: ObjectId,
    //   ref: "Category",
    // },
    // subcategory: [
    //   {
    //     type: ObjectId,
    //     ref: "SubCategory",
    //   },
    // ],
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    // image: {
    //   type: Array,
    // },
    shipping: {
      type: String,
      enum: ["yes", "no"],
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
    },
    brand: {
      type: String,
      enum: ["Consider Herbs", "Partner 1", "Partner 2"],
    },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
