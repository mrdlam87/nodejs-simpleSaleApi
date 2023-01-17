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
