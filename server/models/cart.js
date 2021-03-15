const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    cartTotal: {
      type: Number,
    },
    totalAfterDiscount: {
      type: Number,
    },
    orderedBy: {
      //good for querying cart based on user id
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema); //export as User model
