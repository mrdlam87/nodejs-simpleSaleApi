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
  const discount = +req.query.discount;

  console.log(discount);

  lineItems.forEach((item) => {
    const { id, quantity } = item;
    const index = newSale.totalItems.findIndex((e) => e.id === id);
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
