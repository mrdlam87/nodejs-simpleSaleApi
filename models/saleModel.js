const mongoose = require("mongoose");

mongoose.Schema.Types.DocumentArray.set("_id", false);

const saleSchema = new mongoose.Schema({
  lineItems: {
    type: [{ id: String, quantity: Number }],
    required: true,
  },
  totalItems: {
    type: [{ id: String, totalPrice: Number, discount: Number }],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
