const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const cloudinary = require("../utils/cloudinary");

const multer = require("multer");
const path = require("path");
const uploadPath = path.join("public", Product.productImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  dest: uploadPath,
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All Products Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // "ca" can find "cake" and "CAke" ... etc
  }
  try {
    const products = await Product.find(searchOptions); // just use find method this time in mongoose (find all)
    res.render("products/index", {
      products: products,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
    console.log("error occurred", error);
  }
});

// New Products Route
router.get("/new", (req, res) => {
  res.render("products/new", { product: new Product() });
});

// Create Product Route
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const fileName =
      req.file !== null ? req.file.originalname.split(".")[0] : null;

    const cloudinary_upload = await cloudinary.uploader.upload(
      req.file.path,
      "eeso-cake-upload-preset",
      {
        use_filename: true,
        unique_filename: false,
        folder: "eeso-cake-product-images",
      }
    );
    console.log("cloudinary_upload result : ", cloudinary_upload);

    const image_url = cloudinary_upload.secure_url;

    const product = new Product({
      name: fileName,
      ingredient: req.body.ingredient,
      layer: req.body.layer,
      design: req.body.design,
      description: req.body.description,
      image_url: image_url,
    });

    console.log("mongoDB Product upload result : ", product);

    const newProduct = await product.save();

    // res.redirect(`products/${newProduct.id}`);
    res.redirect("products");
  } catch (error) {
    res.render("products/new", {
      product: product,
      errorMessage: "Error creating Product",
    });
    console.log("error is : ", error);
  }
});

module.exports = router;
