const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//make sure to destructure here or the application crashes because it gets
//object instead of function in call to router.get which requires a callback function
//controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/formortype");

router.post("/formortype", authCheck, adminCheck, create);
router.get("/formortypes", list); //public so no middleware, listing categories available
router.get("/formortype/:slug", read); //send slug from front-end to query database single category
router.put("/formortype/:slug", authCheck, adminCheck, update);
router.delete("/formortype/:slug", authCheck, adminCheck, remove);

//need to export from here to use in server.js
module.exports = router;
