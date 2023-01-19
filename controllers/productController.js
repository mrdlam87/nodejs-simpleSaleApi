const fs = require("fs");
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`)
);

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = (req, res) => {
  const product = products.find((product) => product.id === +req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.createProduct = (req, res) => {
  const newId = products.length + 1;
  const newProduct = { id: newId, ...req.body };

  products.push(newProduct);

  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          product: newProduct,
        },
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  const product = products.find((product) => product.id === +req.params.id);
  Object.assign(product, req.body);

  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          product,
        },
      });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex((product) => product.id === +req.params.id);
  index && products.splice(index, 1);

  fs.writeFile(
    `${__dirname}/../data/products.json`,
    JSON.stringify(products),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};
