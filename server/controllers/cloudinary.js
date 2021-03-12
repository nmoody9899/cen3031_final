const cloudinary = require("cloudinary");

//config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//with form data req.files.file.path
exports.upload = async (req, res) => {
  //resize image in front end, convert to binary and send to endpoint cloudinary
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", //jpeg or png ...
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  //to remove we need img id
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.send("image deleted");
  });
};
