const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//make sure to destructure here or the application crashes because it gets
//object instead of function in call to router.get which requires a callback function
//controller
const {
  create,
  listAll,
  list, //post request
  remove,
  read,
  update,
  productsCount, //for listing on New Arrivals/ Best Sellers pagination support
  productStar, //for ratings
  listRelatedByCat, //for related products by category
  searchFilters,
} = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
//for getting products for pagination
router.get("/products/total", productsCount);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

//using post here because sending data in request body is easier (sending parameters in body for sorting, limit quantity, etc.)
router.post("/products", list);

//ratings for product
router.put("/product/star/:productId", authCheck, productStar);

//related products get
router.get("/product/related/:productId", listRelatedByCat);

//search query: use post because it's easier to send parameters
router.post("/search/filters", searchFilters);

//need to export from here to use in server.js
module.exports = router;
