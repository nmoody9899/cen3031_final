const FormOrType = require("../models/formortype");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(
      await new FormOrType({
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
    await FormOrType.find({})
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.read = async (req, res) => {
  let brand = await FormOrType.findOne({ slug: req.params.slug }).exec();
  res.json(brand);
};

exports.update = async (req, res) => {
  console.log(`Server controller request was ${req}`);
  const { name } = req.body; //category name change at this point
  try {
    const updated = await FormOrType.findOneAndUpdate(
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
    const deleted = await FormOrType.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Delete brand failed"); //status can be used to set error messages front end
  }
};
