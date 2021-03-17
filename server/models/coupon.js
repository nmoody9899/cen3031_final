const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Coupon Name is required.",
      minlength: [6, "Too Short"],
      maxlength: [16, "Too long"],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: [0, "No discounts less than 0%"],
      max: [100, "No discounts greater than 100%"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema); //export as User model
