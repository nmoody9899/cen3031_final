const express = require("express");
const router = express.Router();
//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { upload, remove } = require("../controllers/cloudinary");

//need routes for upload and one for remove
//upload will allow for multiple image upload
//remove will be single image at a time
router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
