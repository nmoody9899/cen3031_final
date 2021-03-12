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
      maxlength: 8192,
      text: true, //search database using description
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategory: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
    formortype: {
      type: ObjectId,
      ref: "FormOrType",
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["yes", "no"],
    },
    size: {
      type: Number,
      default: 0,
    },
    unitofmeasure: {
      type: ObjectId,
      ref: "Unit",
    },
    // unit: {
    //   type: String,
    //   enum: ["mg", "g", "ml", "L", "oz"],
    // },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    ingredient: [
      {
        type: ObjectId,
        ref: "Ingredient",
      },
    ],

    // brand: {
    //   type: String,
    //   enum: ["Consider Herbs", "Partner Herb Co.", "Lotus Herb, LLC."],
    // },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
