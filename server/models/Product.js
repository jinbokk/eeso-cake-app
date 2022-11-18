const mongoose = require("mongoose");

// const productImageBasePath = "uploads/productImages";

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    ingredient: { type: String, required: true },
    layer: { type: Number, required: true },
    design: { type: Array, default: [], required: true },
    image: { type: Array, default: [] },
    image_url: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
// module.exports.productImageBasePath = productImageBasePath;
