const asyncHandler = require("express-async-handler");
const sequelize = require("../database/database");
const Order = require("../database/models/order");
const OrdersContent = require("../database/models/orders_content");
const { uuid } = require("uuidv4");
const { sanitizeCharsAndNumbers } = require("../utils/checkUserInput");

exports.findAllOrders = asyncHandler(async (req, res, next) => {
  if(!req.query.pass) {
    res.status(400).json({ status: "ERR", message: "Bad request [1]" });
    return;
  }
  let password = sanitizeCharsAndNumbers(req.query.pass);
  if(password != 'Password123') {
    res.status(400).json({ status: "ERR", message: "Bad request [2]" });
    return;
  }

  const all = await Order.findAll();
  if (all.length === 0) {
    res.status(404).json({ status: "ERR", message: "Orders not found" });
    return;
  }
  res.status(200).json({ status: "OK", data: all });
});

exports.findAllOrdersContent = asyncHandler(async (req, res, next) => {
  if(!req.query.pass) {
    res.status(400).json({ status: "ERR", message: "Bad request [1]" });
    return;
  }
  let password = sanitizeCharsAndNumbers(req.query.pass);
  if(password != 'Password123') {
    res.status(400).json({ status: "ERR", message: "Bad request [2]" });
    return;
  }

  const all = await OrdersContent.findAll(
    {
      attributes: ['id', 'orderId', 'productId', 'quantity', 'createdAt']
    }
  );
  if (all.length === 0) {
    res.status(404).json({ status: "ERR", message: "Orders content not found" });
    return;
  }
  res.status(200).json({ status: "OK", data: all });
});

exports.addNewOrder = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const ordersArr = JSON.parse(req.body.order);
  const phone = req.body.phone;

  let orderId;
  let timeStamp;
  let orderInfo;
  const resultOrdersArray = [];

  if (ordersArr.length > 0 && phone !== "") {
    orderId = uuid();
    timeStamp = Date.now();
    orderInfo = { orderId, phone, orderStatus: 0, createdAt: timeStamp };

    for (let i = 0; i < ordersArr.length; i++) {
      resultOrdersArray.push({
        orderId,
        productId: ordersArr[i].productId,
        quantity: ordersArr[i].quantity,
        createdAt: timeStamp,
      });
    }
  } else {
    res.sendStatus(400);
    return;
  }

  const t = await sequelize.transaction();
  const addOrderContent = () => OrdersContent.bulkCreate(resultOrdersArray, { transaction: t })
    .then((result) => {
      t.commit();
      res.status(201).json({ status: "OK", message: "Order created." });
    })
    .catch((err) => {
      console.error(err);
      t.rollback();
      res
        .status(503)
        .json({ status: "ERR", message: "Error request processing" });
      return;
    });

  await Order.create(orderInfo, { transaction: t })
    .then((result) => {
      addOrderContent();
    })
    .catch((err) => {
      console.error(err);
      t.rollback();
      res
        .status(503)
        .json({ status: "ERR", message: "Error request processing" });
        return;
    });
});
