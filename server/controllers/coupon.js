const Coupon = require("../models/coupon");

//create, remove, list

exports.create = async (req, res) => {
  //
  try {
    console.log("Coupon Create req.body:", req.body);
    //name, expiry, discount
    const { coupon } = req.body;
    const { name, expiry, discount } = coupon;

    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log("COUPON CREATE ERR", err);
    res.status(400).json(err.message);
  }
};

exports.remove = async (req, res) => {
  //
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    console.log("COUPON REMOVE ERR", err);
    res.status(400).json(err.message);
  }
};

exports.list = async (req, res) => {
  //
  try {
    res.json(
      await Coupon.find({})
        .sort({ createdAt: -1 })
        .exec()
    );
  } catch (err) {
    console.log("COUPON LIST ERR", err);
  }
};

// exports.couponsActiveCount = async (req, res) => {
//   //
//   console.log("ACTIVE COUPONS COUNT:");

//   var today = new Date();

//   console.log(
//     "checking to see what coupons have an expiry greater than or equal to present:",
//     today
//   );

//   let countActiveCoupons = [];

//   countActiveCoupons = await Coupon.find({
//     expiry: { $gt: today },
//   }).exec();

//   console.log("returning ", countActiveCoupons);
//   res.json(countActiveCoupons.length);
// };
