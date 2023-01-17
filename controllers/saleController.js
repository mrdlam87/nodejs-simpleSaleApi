const fs = require("fs");
const sales = JSON.parse(fs.readFileSync(`${__dirname}/../data/sales.json`));
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`)
);

exports.getAllSales = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      sales,
    },
  });
};

exports.createSale = (req, res) => {
  const newId = sales.length + 1;
  const lineItems = req.body;
  const newSale = { id: newId, lineItems, totalItems: [], totalPrice: 0 };

  lineItems.forEach((item) => {
    const { productId, quantity } = item;
    const index = newSale.totalItems.findIndex(
      (e) => e.productId === productId
    );
    const { price } = products.find((product) => product.id === productId);
    const cost = quantity * price;

    if (index >= 0) {
      newSale.totalItems[index].cost += cost;
    } else {
      newSale.totalItems.push({
        productId,
        cost,
      });
    }

    newSale.totalPrice += cost;
  });

  sales.push(newSale);

  fs.writeFile(
    `${__dirname}/../data/sales.json`,
    JSON.stringify(sales),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          sale: newSale,
        },
      });
    }
  );
};
