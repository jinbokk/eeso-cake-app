// https://www.geeksforgeeks.org/how-to-upload-single-multiple-image-to-cloudinary-using-node-js/

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const cloudinary = require("../middleware/cloudinary.js");
const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("./temp")) {
  fs.mkdirSync("./temp");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // const cloudinary_upload = await cloudinary.uploader
    //   .upload(req.file.path, "eeso-cake-upload-preset", {
    //     use_filename: true,
    //     unique_filename: false,
    //     folder: "eeso-cake-product-images",
    //   })
    //   .then((cloudinary_result) => {
    //     fs.unlinkSync(req.file.path);
    //     return res.status(200).json({
    //       message: "cloudinary upload success",
    //       cloudinary_result: cloudinary_result,
    //     });
    //   })
    //   .catch((err) => {
    //     fs.unlinkSync(req.file.path);
    //     return res.status(400).json({ success: false, message: err });
    //   });
    // const product = new Product({
    //   title: req.body.title,
    //   ingredient: req.body.ingredient,
    //   // layer: Number(req.body.layer),
    //   design: req.body.design,
    //   image_url: cloudinary_upload.secure_url,
    //   description: req.body.description,
    //   price: Number(req.body.price),
    //   sold: Number(0),
    //   views: Number(0),
    // });
    // product.save();
    // product.save((err) => {
    //   if (err) {
    //     return res.status(400).json({ success: false, message: err });
    //   } else {
    //     return res.status(200).json({ success: true, message: mongoDB_result });
    //   }
    // });
    ////////////////////////////////////////////////////////////
    const cloudinary_upload = await cloudinary.uploader.upload(
      req.file.path,
      "eeso-cake-upload-preset",
      {
        use_filename: true,
        unique_filename: false,
        folder: "eeso-cake-product-images",
      }
    );

    const product = new Product({
      title: req.body.title,
      ingredient: req.body.ingredient,
      layer: req.body.layer,
      design: req.body.design,
      image_url: cloudinary_upload.secure_url,
      description: req.body.description,
      price: req.body.price,
      sold: 0,
      views: 0,
    });

    product.save((err) => {
      if (err) {
        res.status(400).json({ success: false, message: err });
        return fs.unlinkSync(req.file.path);
      } else {
        res.status(200).json({ success: true });
        return fs.unlinkSync(req.file.path);
      }
    });

    //   .then((cloudinary_result) => {
    //     fs.unlinkSync(req.file.path);
    //     return res.status(200).json({
    //       message: "cloudinary upload success",
    //       cloudinary_result: cloudinary_result,
    //     });
    //   })
    //   .catch((err) => {
    //     fs.unlinkSync(req.file.path);
    //     return res.status(400).json({ success: false, message: err });
    //   });
    // const product = new Product({
    //   title: req.body.title,
    //   ingredient: req.body.ingredient,
    //   // layer: Number(req.body.layer),
    //   design: req.body.design,
    //   image_url: cloudinary_upload.secure_url,
    //   description: req.body.description,
    //   price: Number(req.body.price),
    //   sold: Number(0),
    //   views: Number(0),
    // });
    // product.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
