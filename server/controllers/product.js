const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body); //check to see what is coming back
    req.body.slug = slugify(req.body.title); //add slug to req.body
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    //console.log(err);
    //console.log(err.message);
    res.status(400).send("Create product failed");
    // res.status(400).json({
    //   err: err.message, //from mongoose
    // });
  }
};
