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
} = require("../controllers/unitofmeasure");

router.post("/unitofmeasure", authCheck, adminCheck, create);
router.get("/unitofmeasures", list); //public so no middleware, listing categories available
router.get("/unitofmeasure/:slug", read); //send slug from front-end to query database single category
router.put("/unitofmeasure/:slug", authCheck, adminCheck, update);
router.delete("/unitofmeasure/:slug", authCheck, adminCheck, remove);

//need to export from here to use in server.js
module.exports = router;
