const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
// const m2s = require("mongoose-to-swagger");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
dayjs.locale("ko");

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String },
    ingredient: { type: String, required: true },
    layer: { type: Number, required: true },
    design: { type: Array, default: [], required: true },
    image_url: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: dayjs().add(-9, "hour").format(),
    },
  }
);

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
// const swaggerSchema = m2s(mongoose.model("Product", productSchema));
// console.log(swaggerSchema);
