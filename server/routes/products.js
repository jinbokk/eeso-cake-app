// https://www.geeksforgeeks.org/how-to-upload-single-multiple-image-to-cloudinary-using-node-js/

const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const cloudinary = require("../middleware/cloudinary.js");
const multer = require("multer");
const fs = require("fs");
const ObjectId = require("mongodb").ObjectId;

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

router.post("/upload", upload.single("file"), async (req, res) => {
  const cloudinary_upload = await cloudinary.uploader.upload(
    req.file.path,
    "eeso-cake-upload-preset",
    {
      use_filename: true,
      unique_filename: false,
      folder: "eeso-cake-product-images",
    }
  );

  const image_url = cloudinary_upload.secure_url;
  //append로 추가한 데이터는 string처리가 되어 서버단에서 다시 array화 하는 작업을 추가함

  const product = new Product({
    title:
      req.body.title !== "" && req.body.title !== "undefined"
        ? req.body.title
        : null,
    ingredient:
      req.body.ingredient !== "" && req.body.ingredient !== "undefined"
        ? req.body.ingredient
        : null,
    layer:
      req.body.layer !== "" && req.body.layer !== "undefined"
        ? req.body.layer
        : 1,
    design:
      req.body.ingredient !== "" && req.body.design !== "undefined"
        ? req.body.design.split(",").map((item) => item)
        : [],
    image_url: image_url,
    description:
      req.body.description !== "" && req.body.description !== "undefined"
        ? req.body.description
        : null,
    price:
      req.body.price !== "" && req.body.price !== "undefined"
        ? req.body.price
        : 0,
    sold: 0,
    views: 0,
  });

  try {
    await product.save().then((result) => {
      res.status(200).json({ success: true });
      return fs.unlinkSync(req.file.path);
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
    return fs.unlinkSync(req.file.path);
  }
});

// CAKES PAGE
router.get("/cakes/:ingredient", async (req, res) => {
  let { ingredient } = req.params;
  let { design } = req.query;

  let query;
  if (ingredient === "all") {
    query = {};
  } else {
    if (design) {
      query = {
        ingredient: ingredient,
        design: design,
      };
    } else {
      query = {
        ingredient: ingredient,
      };
    }
  }

  const option = {
    page: parseInt(req.query.page) || parseInt(1),
    limit: 30,
    sort: { createdAt: -1 },
  };

  const results = await Product.paginate(query, option);

  return res.status(200).json(results);
});

// ORDER PAGE
router.get("/order/:category", async (req, res) => {
  let { category } = req.params;

  let query = {
    price: { $ne: 0 },
  };

  category !== "all" ? (query.ingredient = category) : null;

  const option = {
    page: parseInt(req.query.page) || parseInt(1),
    limit: 8,
  };

  const results = await Product.paginate(query, option);

  return res.status(200).json(results);
});

// ORDER PRODUCT DETAIL PAGE
router.get("/order/detail/:productId", async (req, res) => {
  let { productId } = req.params;
  let o_id = new ObjectId(productId);

  try {
    await Product.find({ _id: o_id }).then((productDetail) => {
      return res.status(200).send(productDetail[0]);
    });
  } catch (error) {
    return res.status(400).send(err);
  }
});

// CART PAGE
router.get("/products-by-id", async (req, res) => {
  let productIds = req.query.id.split(",");

  await Product.find({ _id: { $in: productIds } }).then((err, productDetail) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json(productDetail);
  });
});

module.exports = router;
