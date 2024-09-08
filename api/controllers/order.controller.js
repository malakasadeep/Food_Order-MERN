const Order = require("../models/order.model");

// Helper function to generate unique 6-digit order ID starting with 'O'
const generateOrderId = async () => {
  let orderId;
  let existingOrder;
  do {
    orderId = "O" + Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
    existingOrder = await Order.findOne({ orderId });
  } while (existingOrder); // Ensure unique ID

  return orderId;
};

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  try {
    const orderId = await generateOrderId();
    const orderData = { ...req.body, orderId };

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Fetch orders by userId
exports.getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
