const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrder,
  updateOrder,
} = require("../controllers/order.controller");

const router = express.Router();

// Route to create an order
router.post("/create", createOrder);
router.get("/get/:userId", getOrderByUser);
router.delete("/delete/:orderId", deleteOrder);
router.put("/update/:orderId", updateOrder);

module.exports = router;
