const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
//const _ = require("underscore");

const app = express();

app.use(bodyParser.json());

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

app
  .route("/products")
  .get((req, res) => {
    res.json(products);
  })
  .post((req, res) => {
    const product = req.body;
    if (!product || !product.name || !product.price) {
      res.status(400).json({
        message: "Bad request",
      });
      return;
    }
    product.id = uuidv4();
    products.push(product);
    res.status(201).json(product);
  });

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((item) => item.id === Number(id));
  res.json(product);

  res.status(404).json({ message: "Product not found" });
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex((item) => item.id === Number(id));
  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const product = req.body;
  if (!product || !product.name || !product.price) {
    res.status(400).json({
      message: "Bad request",
    });
    return;
  }
  product.id = id;
  products[productIndex] = product;
  res.status(200).json(product);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
