const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//trim used to trim whitespace when user queries

const unitOfMeasureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [1, "Unit name too short"],
      maxlength: [16, "Unit name too long"],
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

module.exports = mongoose.model("Unit", unitOfMeasureSchema);
