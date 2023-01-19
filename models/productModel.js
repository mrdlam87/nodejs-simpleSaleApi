const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      min: [0, "Price must be positive"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
