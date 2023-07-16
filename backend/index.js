const bodyParser = require('body-parser');
const cors = require("cors");
const express = require("express");
const helmet = require('helmet');
const categories = require("./routes/categories");
const sale = require("./routes/sale");
const orders = require("./routes/orders");
const products = require("./routes/products");
const discount = require("./routes/discount");
const sequelize = require("./database/database");
const Category = require("./database/models/category");
const Product = require("./database/models/product");
const Order = require("./database/models/order");
const OrdersContent = require("./database/models/orders_content");
const PORT = 3333;

Category.hasMany(Product);
Order.hasMany(OrdersContent);

const app = express();
app.use(helmet.hidePoweredBy());
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded());
app.use("/categories", categories);
app.use("/products", products);
app.use("/sale", sale);
app.use("/order", orders);
app.use("/discount", discount);

app.use(express.json());

const start = async () => {
  try {
    await sequelize.sync().then(
      (result) => {
        console.log(result);
      },
      (err) => console.log(err)
    );

    app.listen(PORT, () => {
      console.log(`\n\nServer started on ${PORT} port...`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
