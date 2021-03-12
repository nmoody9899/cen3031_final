const SubCategory = require("../models/subcategory");
const slugify = require("slugify");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new SubCategory({
        name: name,
        parent: parent,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    //console.log(err);
    res.status(400).send("Create sub-category failed"); //status can be used to set error messages front end
  }
};

exports.list = async (req, res) => {
  res.json(
    await SubCategory.find({})
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.read = async (req, res) => {
  //get subcategory
  const subcategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();
  //now get related products
  const products = await Product.find({ subcategory: subcategory })
    .populate("category")
    .populate("subcategory")
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .exec();

  res.json({
    subcategory: subcategory,
    products: products,
  });
};

exports.update = async (req, res) => {
  console.log(`Server controller request was ${req}`);
  const { name } = req.body; //category name change at this point
  const { parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent: parent, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Update sub-category failed"); //status can be used to set error messages front end
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Delete sub-category failed"); //status can be used to set error messages front end
  }
};
