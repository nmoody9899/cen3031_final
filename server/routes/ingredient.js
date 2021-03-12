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
  listAll,
} = require("../controllers/ingredient");

router.post("/ingredient", authCheck, adminCheck, create);
router.get("/ingredients", list); //public so no middleware, listing categories available
router.get("/ingredient/:slug", read); //send slug from front-end to query database single category
router.put("/ingredient/:slug", authCheck, adminCheck, update);
router.delete("/ingredient/:slug", authCheck, adminCheck, remove);
router.get("/ingredients/:count", listAll);

//need to export from here to use in server.js
module.exports = router;
