const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqid = require("uniqid");

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

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({
    $and: [{ name: coupon }, { expiry: { $gte: new Date() } }],
  }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price brand")
    .exec();

  //const products = cart.products; //make it easier to handle on front-end
  //const cartTotal = cart.cartTotal;
  //const totalAfterDiscount = cart.totalAfterDiscount;

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  const totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  console.log("TOTAL AFTER DISCOUNT ------> ", totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount: totalAfterDiscount }, //since field name and variable are same name just use one instead of totalAfterDiscount: totalAfterDiscount
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec(); //need user for cart and token
  //save cart items as order and then empty cart
  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  //order saved so now decrement quantity available, increment number of item sold (these are both available in product model) and come from cart count
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT! item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  //Product.bulkWrite({})
  //now apply bulk operation to products
  let updated = await Product.bulkWrite(bulkOption, {});

  console.log(
    "PRODUCTS QUANTITY DECREMENTED AND SOLD INCREMENTED------>",
    updated
  );

  console.log("NEW ORDER SAVED", newOrder);

  res.json({ ok: true });
};

exports.createCashOrder = async (req, res) => {
  const { cashOnDelivery, couponApplied } = req.body;
  //create a payment intent otherwise user/admin will have errors in their dashboards
  if (!cashOnDelivery) {
    return res.status(400).send("Create Cash Order Failed!");
  }
  //if COD is true then create order with status Cash On Delivery
  const user = await User.findOne({ email: req.user.email }).exec(); //need user for cart and token
  //save cart items as order and then empty cart
  const cart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && cart.totalAfterDiscount > 0) {
    finalAmount = cart.totalAfterDiscount;
  } else {
    finalAmount = cart.cartTotal;
  }

  let newOrder = await new Order({
    products: cart.products,
    paymentIntent: {
      id: uniqid(),
      amount: finalAmount * 100, //need to fix this in case coupon was applied
      currency: "usd",
      status: "Cash On Delivery",
      created: Math.ceil(Date.now() / 1000),
      payment_method_types: ["cash"],
    },
    orderStatus: "cash on delivery",
    orderedBy: user._id,
  }).save();

  //order saved so now decrement quantity available, increment number of item sold (these are both available in product model) and come from cart count
  let bulkOption = cart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT! item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  //Product.bulkWrite({})
  //now apply bulk operation to products
  let updated = await Product.bulkWrite(bulkOption, {});

  console.log(
    "PRODUCTS QUANTITY DECREMENTED AND SOLD INCREMENTED------>",
    updated
  );

  console.log("NEW CASH ORDER SAVED", newOrder);

  res.json({ ok: true });
};

exports.getUserOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();
  //query orders with this user
  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    // .exec();
    .populate({
      path: "products.product",
      populate: {
        path: "brand",
        model: "Brand",
      },
    })
    .sort({ createdAt: -1 })
    .exec();

  console.log(
    "user orders in getUserOrders",
    JSON.stringify(userOrders, null, 4)
  );

  res.json(userOrders);
};

//post
exports.addToWishlist = async (req, res) => {
  //
  const { productId } = req.body; //send product id in request body
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { returnOriginal: false }
  ).exec(); //user email comes from authCheck

  res.json({ ok: true });
};

//get
exports.wishlist = async (req, res) => {
  //
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

//put
exports.removeFromWishlist = async (req, res) => {
  //
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
    { returnOriginal: false }
  ).exec();

  res.json({ ok: true });
};
