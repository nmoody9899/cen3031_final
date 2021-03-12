const Category = require("../models/category");
const slugify = require("slugify");
const SubCategory = require("../models/subcategory");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(
      await new Category({
        name: name,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    //console.log(err);
    res.status(400).send("Create category failed"); //status can be used to set error messages front end
  }
};

exports.list = async (req, res) => {
  res.json(
    await Category.find({})
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  //res.json(category);
  const products = await Product.find({ category: category })
    .populate("category")
    .populate("subcategory")
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .exec();

  res.json({
    category: category,
    products: products,
  });
};

exports.update = async (req, res) => {
  console.log(`Server controller request was ${req}`);
  const { name } = req.body; //category name change at this point
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Update category failed"); //status can be used to set error messages front end
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Delete category failed"); //status can be used to set error messages front end
  }
};

//each subcategory has a parent
exports.getSubCategories = async (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subcategories) => {
    if (err) {
      console.log(err);
    }
    res.json(subcategories);
  });
};
