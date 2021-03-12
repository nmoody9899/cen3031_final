const Brand = require("../models/brand");
const slugify = require("slugify");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(
      await new Brand({
        name: name,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    //console.log(err);
    res.status(400).send("Create brand failed"); //status can be used to set error messages front end
  }
};

exports.list = async (req, res) => {
  res.json(
    await Brand.find({})
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.read = async (req, res) => {
  const brand = await Brand.findOne({ slug: req.params.slug }).exec();

  const products = await Product.find({ brand: brand })
    .populate("category")
    .populate("subcategory")
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .exec();

  res.json({
    brand: brand,
    products: products,
  });
};

exports.update = async (req, res) => {
  console.log(`Server controller request was ${req}`);
  const { name } = req.body; //category name change at this point
  try {
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Update brand failed"); //status can be used to set error messages front end
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Delete brand failed"); //status can be used to set error messages front end
  }
};
