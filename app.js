// IMPORTS
const express = require("express");
const morgan = require("morgan");
const productController = require("./controllers/productController");
const saleController = require("./controllers/saleController");

// INITIALIZATION
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// ROUTES
const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

salesRouter
  .route("/")
  .get(saleController.getAllSales)
  .post(saleController.createSale);

app.use("/products", productsRouter);
app.use("/sales", salesRouter);

app.get("/", (req, res) => {
  res.send("INDEX");
});

module.exports = app;
