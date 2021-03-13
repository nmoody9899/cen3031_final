const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  //cart will come in request body
  //console.log("userCart server side: ------> ", req.body);
  const { cart } = req.body;

  //console.log("userCart cart ---->", JSON.stringify(cart, null, 4));

  //create array of products -- count comes from front-end as count of product user is trying to buy but this doesn't exist in Product model
  let products = [];

  //get user who is making order
  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user id already exists - user will have only one cart, but can have multiple order history
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    //remove cart to start fresh
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  //save brand new cart for user with products having count
  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id; //this is the actual database product by id
    //now add additional fields of interest
    object.count = cart[i].count; //attach count of current product
    //now get price for total
    let { price } = await Product.findById(cart[i]._id)
      .select("price")
      .exec(); //get the product price from database NOT LOCAL STORAGE

    object.price = price;

    //now push the object to the products array
    products.push(object);
  }

  //console.log("WE ARE HERE products --->", products);
  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].count * products[i].price;
  }

  console.log("cartTotal", cartTotal);

  //now save this to the newCart for user: check Cart model for fields
  let newCart = await new Cart({
    products, //array of products
    cartTotal, //total for this cart
    //totalAfterDiscount,//if discounted
    orderedBy: user._id,
  }).save();

  console.log("new cart ---->", newCart);
  res.json({ ok: true }); //we check for ok being true so we can proceed to checkout page
};

//this is for use first on Checkout Page
exports.getUserCart = async (req, res) => {
  console.log("GET USER CART");
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  const products = cart.products; //make it easier to handle on front-end
  const cartTotal = cart.cartTotal;
  const totalAfterDiscount = cart.totalAfterDiscount;

  res.json({ products, cartTotal, totalAfterDiscount }); //get on front end req.data.products, req.data.cartTotal
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  console.log("saveAddress req is", req);
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true }); //if we receive ok(true) on front end then the save was successful
};
