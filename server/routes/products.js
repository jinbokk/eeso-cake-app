const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const cloudinary = require("../middleware/cloudinary.js");
const multer = require("multer");

// multer diskStorage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },

//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

//when upload page, use cloudinary api
router.post("/", async (req, res) => {
  try {
    //     // const product = new Product(req.body);

    //     // console.log("product is : ", product);
    console.log(req.body);
    const cloudinary_upload = await cloudinary.uploader.upload(
      // req.body.image.path,
      req.body.image,
      "eeso-cake-upload-preset",
      {
        use_filename: true,
        unique_filename: false,
        folder: "eeso-cake-product-images",
      }
    );

    // console.log("cloudinary_upload result : ", cloudinary_upload);

    // const image_url = cloudinary_upload.secure_url;

    // console.log("cloudinary image url : ", image_url);

    // console.log("mongoDB Product upload result : ", product);

    // product.save((err) => {
    //   if (err) {
    //     return res.status(400).json({ success: false, err });
    //   } else {
    //     return res.status(200).json({ success: true });
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
