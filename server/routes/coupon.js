const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//make sure to destructure here or the application crashes because it gets
//object instead of function in call to router.get which requires a callback function
//controller
const {
  create,
  remove,
  list,
  //   couponsActiveCount,
} = require("../controllers/coupon");

router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list); //public so no middleware, listing categories available
// router.get("/coupons/activetotal", couponsActiveCount);

router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

//need to export from here to use in server.js
module.exports = router;
