const express = require("express");
const orders_controller = require("../controllers/ordersController");

const router = express.Router();
const urlencodedParser = express.urlencoded({extended: true});

router.get("/all", 
  orders_controller.findAllOrders
);

router.get("/allOrdersContent", (req, res) => {
  orders_controller.findAllOrdersContent(req, res);
});

router.get("/send", (req, res) => {
  res.json({status:"ERR", message: 'Please use a POST request'});
}); 

router.post("/send", urlencodedParser, (req, res) => {
  orders_controller.addNewOrder(req, res);
});

module.exports = router;
