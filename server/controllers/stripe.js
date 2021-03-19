const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //later apply coupon
  const { couponApplied } = req.body;
  console.log("coupon applied", couponApplied);

  //calculate price
  //1 find the user
  const user = await User.findOne({ email: req.user.email }).exec();
  //2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  //const products = cart.products; //make it easier to handle on front-end
  //const cartTotal = cart.cartTotal;
  //const totalAfterDiscount = cart.totalAfterDiscount;
  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount > 0) {
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
  }

  // console.log(
  //   "CART TOTAL:",
  //   cartTotal,
  //   "TOTAL AFTER DISCOUNT:",
  //   totalAfterDiscount,
  //   "FINAL AMOUNT PAYABLE",
  //   finalAmount
  // );

  //3 create payment intent with order amount and currency

  //these payments to stripe are sent in cents!!! so need to multiply any total for amount by 100 before sending
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "usd",
    // receipt_email: user.email,
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal: cartTotal,
    totalAfterDiscount: totalAfterDiscount,
    payable: finalAmount,
  });
};
