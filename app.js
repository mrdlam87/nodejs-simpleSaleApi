// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const productController = require("./controllers/productController");
const saleController = require("./controllers/saleController");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// INITIALIZATION
const app = express();

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

productsRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

salesRouter
  .route("/")
  .get(saleController.getAllSales)
  .post(saleController.createSale);

salesRouter
  .route("/:id")
  .get(saleController.getSale)
  .delete(saleController.deleteSale);

app.use("/products", productsRouter);
app.use("/sales", salesRouter);

app.get("/", (req, res) => {
  res.send("INDEX");
});

module.exports = app;
