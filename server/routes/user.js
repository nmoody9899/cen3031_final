const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth"); //you can get user from authCheck

const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
} = require("../controllers/user");

//we have user in client, now we need to check on back
router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

//CART RELATED ROUTES

router.post("/user/cart", authCheck, userCart); //save cart

router.get("/user/cart", authCheck, getUserCart);

router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, saveAddress);

//need to export from here to use in server.js
module.exports = router;
