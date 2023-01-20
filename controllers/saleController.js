const Sale = require("../models/saleModel");
const Product = require("../models/productModel");

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();

    res.status(200).json({
      status: "success",
      results: sales.length,
      data: {
        sales,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        sale,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createSale = async (req, res) => {
  const lineItems = req.body;
  const newSale = { lineItems, totalItems: [], totalPrice: 0 };
  const discount = +req.query.discount;
  const products = await Product.find();

  console.log(products);

  lineItems.forEach((item) => {
    const { id, quantity } = item;

    const index = newSale.totalItems.findIndex((item) => item.id === id);
    const { price } = products.find((product) => product.id === id);
    const totalPrice = quantity * price;

    if (index >= 0) {
      newSale.totalItems[index].totalPrice += totalPrice;
    } else {
      newSale.totalItems.push({
        id,
        totalPrice,
      });
    }

    newSale.totalPrice += totalPrice;
  });

  if (discount) {
    const discounteRate = discount / newSale.totalPrice;
    newSale.discount = discount;
    newSale.totalPrice -= discount;

    newSale.totalItems.forEach((item) => {
      item.discount = discounteRate * item.totalPrice;
      item.totalPrice -= item.discount;
    });
  }

  const sale = await Sale.create(newSale);

  res.status(201).json({
    status: "success",
    data: {
      sale,
    },
  });
};

exports.deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
