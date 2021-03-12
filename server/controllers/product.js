const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    console.log(req.body); //check to see what is coming back
    req.body.slug = slugify(req.body.title); //add slug to req.body
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    //console.log(err);
    //console.log(err.message);
    //res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message, //from mongoose
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count)) //this comes from route /:count and need it to be integer
    .populate("category") //from product model
    .populate("subcategory") //from product model
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category") //from product model
    .populate("subcategory") //from product model
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { returnOriginal: false }
    ).exec();
    res.json(updated); //this is what is being returned
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR-------->>", err);
    //return res.status(400).send("Product Update Failed");
    res.status(400).json({
      err: err.message, //from mongoose
    });
  }
};

//use for new arrivals and best sellers
// exports.list = async (req, res) => {
//   //query products from database
//   //get all products
//   try {
//     //sort will be like createdAt/updatedAt, order will be desc/asc, limit will be integer value
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcategory")
//       .populate("formortype")
//       .populate("unitofmeasure")
//       .populate("brand")
//       .populate("ingredient")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.productsCount = async (req, res) => {
  let total = await Product.find({})
    .estimatedDocumentCount()
    .exec();
  res.json(total);
};

//WITH PAGINATION
//use for new arrivals and best sellers

exports.list = async (req, res) => {
  //query products from database
  //get all products
  try {
    //sort will be like createdAt/updatedAt, order will be desc/asc, limit will be integer value
    const { sort, order, page, prodPerPage } = req.body;
    const currentPage = page || 1; //default will be for page 1
    const perPage = prodPerPage;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage) //skip this many products each time user pages and return that set of products, i.e. 0-2 page 1, 3-5 page 2
      .populate("category")
      .populate("subcategory")
      .populate("formortype")
      .populate("unitofmeasure")
      .populate("brand")
      .populate("ingredient")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  //star rating will be sent in the body
  const { star } = req.body; //destructure from request body

  //who is updating?
  //check if currently logged in user has already added rating to this product
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user has not left a rating then push new rating
  if (existingRatingObject === undefined) {
    //
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { returnOriginal: false }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user has left a rating then update rating
    let ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { returnOriginal: false }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

//getting related products by category
exports.listRelatedByCat = async (req, res) => {
  //find product by id from productId
  const product = await Product.findById(req.params.productId).exec();
  //find related
  const related = await Product.find({
    _id: { $ne: product._id }, //do not include this product itself
    category: product.category, //find based on this product's category
  })
    .populate("category")
    .populate("subcategory")
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .populate("postedBy")
    .limit(3)
    .exec();

  res.json(related);
};

//SEARCH AND FILTER (Home) AND RELATED HELPER METHODS
//use $text because Product model has title and description as text: true for querying
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } }) //text-based search
    .populate("category")
    .populate("subcategory")
    .populate("formortype")
    .populate("unitofmeasure")
    .populate("brand")
    .populate("ingredient")
    .populate("postedBy")
    .exec();

  console.log("handleQuery: req.body", req.body);

  res.json(products);
};

// //price filtering
// const handlePrice = async (req, res, price) => {
//   try {
//     let products = await Product.find({
//       price: {
//         $gte: price[0],
//         $lte: price[1],
//       },
//     })
//       .populate("category")
//       .populate("subcategory")
//       .populate("formortype")
//       .populate("unitofmeasure")
//       .populate("brand")
//       .populate("ingredient")
//       .populate("postedBy")
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log("handlePrice", err);
//   }
// };

// const handleCategory = async (req, res, category) => {
//   try {
//     let products = await Product.find({ category: { $in: [...category] } })
//       .populate("category")
//       .populate("subcategory")
//       .populate("formortype")
//       .populate("unitofmeasure")
//       .populate("brand")
//       .populate("ingredient")
//       .populate("postedBy")
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log("handleCategory error:", err);
//   }
// };

const handleGeneralSearch = async (
  req,
  res,
  query,
  price,
  category,
  brand,
  subcat,
  ingredient,
  formtype
) => {
  console.log(
    "handleGeneralSearch req.body",
    req.body
    //
  );
  try {
    // let products = await Product.find({
    //   category: { $in: [...category] },
    //   price: {
    //     $gte: price[0],
    //     $lte: price[1],
    //   },
    // }) //WORKING
    let products = await Product.find({
      $and: [
        {
          // $text: { $search: query },
          $or: [
            { title: { $regex: query, $options: "-i" } },
            { description: { $regex: query, $options: "-i" } },
          ],

          $and: [
            { category: { $in: [...category] } },
            { subcategory: { $in: [...subcat] } },

            {
              price: {
                $gte: price[0],
                $lte: price[1],
              },
            },
            { brand: { $in: [...brand] } },
            { ingredient: { $in: [...ingredient] } },
            { formortype: { $in: [...formtype] } },
          ], //end of and
        },
      ], //end of or
    }) //end of search
      .populate("category")
      .populate("subcategory")
      .populate("formortype")
      .populate("unitofmeasure")
      .populate("brand")
      .populate("ingredient")
      .populate("postedBy")
      .exec();

    res.json(products);
    console.log("returning products", products);
  } catch (err) {
    console.log("handleCategory error:", err);
  }
};

const handleGeneralSearchwShip = async (
  req,
  res,
  query,
  price,
  category,
  brand,
  subcat,
  ingredient,
  formtype,
  ships
) => {
  console.log(
    "handleGeneralSearch req.body",
    req.body
    //
  );
  try {
    // let products = await Product.find({
    //   category: { $in: [...category] },
    //   price: {
    //     $gte: price[0],
    //     $lte: price[1],
    //   },
    // }) //WORKING
    let products = await Product.find({
      $and: [
        {
          // $text: { $search: query },
          $or: [
            { title: { $regex: query, $options: "-i" } },
            { description: { $regex: query, $options: "-i" } },
          ],

          $and: [
            { category: { $in: [...category] } },
            { subcategory: { $in: [...subcat] } },

            {
              price: {
                $gte: price[0],
                $lte: price[1],
              },
            },
            { brand: { $in: [...brand] } },
            { ingredient: { $in: [...ingredient] } },
            { formortype: { $in: [...formtype] } },
            { shipping: ships },
          ], //end of and
        },
      ], //end of or
    }) //end of search
      .populate("category")
      .populate("subcategory")
      .populate("formortype")
      .populate("unitofmeasure")
      .populate("brand")
      .populate("ingredient")
      .populate("postedBy")
      .exec();

    res.json(products);
    console.log("returning products", products);
  } catch (err) {
    console.log("handleCategory error:", err);
  }
};

exports.searchFilters = async (req, res) => {
  //destructure query from req.body
  const {
    query,
    price,
    category,
    brand,
    subcat,
    ingredient,
    formtype,
    ships,
  } = req.body;

  // if (query) {
  //   console.log("query --->", query);
  //   await handleQuery(req, res, query);
  // }
  if (ships === "") {
    await handleGeneralSearch(
      req,
      res,
      query,
      price,
      category,
      brand,
      subcat,
      ingredient,
      formtype
    );
  } else {
    await handleGeneralSearchwShip(
      req,
      res,
      query,
      price,
      category,
      brand,
      subcat,
      ingredient,
      formtype,
      ships
    );
  }
  /* //price will be an array of values [20,200] or [0,10]
  if (price !== undefined) {
    console.log("price --->", price);
    await handlePrice(req, res, price);
  }

  //category search
  if (category !== undefined) {
    console.log("category --->", category);
    await handleCategory(req, res, category);
  } */
};
