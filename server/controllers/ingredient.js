const Ingredient = require("../models/ingredient");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body); //check to see what is coming back
    req.body.slug = slugify(req.body.name); //add slug to req.body
    const newIngredient = await new Ingredient(req.body).save();
    res.json(newIngredient);
  } catch (err) {
    //console.log(err);
    //console.log(err.message);
    res.status(400).send("Create ingredient failed");
    // res.status(400).json({
    //   err: err.message, //from mongoose
    // });
  }
};

exports.list = async (req, res) => {
  res.json(
    await Ingredient.find({})
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.read = async (req, res) => {
  let ingredient = await Ingredient.findOne({ slug: req.params.slug }).exec();
  res.json(ingredient);
};

exports.update = async (req, res) => {
  try {
    console.log(req.body); //check to see what is coming back
    req.body.slug = slugify(req.body.name); //add slug to req.body
    const updated = await Ingredient.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Update ingredient failed"); //status can be used to set error messages front end
  }
};

exports.listAll = async (req, res) => {
  let ingredients = await Ingredient.find({})
    .limit(parseInt(req.params.count)) //this comes from route /:count and need it to be integer
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(ingredients);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Ingredient.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    //console.log(err);
    res.status(400).send("Delete ingredient failed"); //status can be used to set error messages front end
  }
};
