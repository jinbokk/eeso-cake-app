const mongoose = require("mongoose");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
dayjs.locale("ko");

const paymentSchema = new mongoose.Schema({
  user: { type: Array, default: [] },
  data: { type: Array, default: [] },
  product: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: dayjs().add(9, "hour").format(),
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
