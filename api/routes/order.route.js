const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrder,
  updateOrder,
  getAllOrders,
  updateOrderStatus,
  generateReport,
} = require("../controllers/order.controller");

const router = express.Router();

// Route to create an order
router.post("/create", createOrder);
router.get("/get/:userId", getOrderByUser);
router.delete("/delete/:orderId", deleteOrder);
router.put("/update/:orderId", updateOrder);

// Get all orders
router.get("/all", getAllOrders);

// Update order status
router.put("/status", updateOrderStatus);

// Generate report (CSV or PDF)
router.get("/report", generateReport);

module.exports = router;
