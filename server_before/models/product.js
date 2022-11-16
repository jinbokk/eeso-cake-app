const mongoose = require("mongoose");

const productImageBasePath = "uploads/productImages";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredient: { type: String, required: true  },
  layer: { type: Number, required: true  },
  design: [{ type: String, required: true  }],
  image_url: { type: String, required: true  },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
module.exports.productImageBasePath = productImageBasePath;
