const Order = require("../models/order.model");
// Import the Order model
const nodemailer = require("nodemailer");
const { createObjectCsvWriter } = require("csv-writer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

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

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Example: use your email service
  auth: {
    user: "sadeepmalaka2@gmail.com", // Your email
    pass: "bfxr wzmt jalb grxp", // Your password or app password
  },
});

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Send email notification
    const mailOptions = {
      from: "sadeepmalaka2@gmail.com",
      to: order.customerInfo.email,
      subject: `Your Order ${order.orderId} Status Updated`,
      text: `Dear ${order.customerInfo.name},\n\nYour order status has been updated to: ${status}.\n\nThank you for your order!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate report (CSV or PDF)
exports.generateReport = async (req, res) => {
  try {
    const { type } = req.query;
    const orders = await Order.find();

    if (type === "csv") {
      const csvWriter = createObjectCsvWriter({
        path: "orders_report.csv",
        header: [
          { id: "orderId", title: "Order ID" },
          { id: "userId", title: "User ID" },
          { id: "status", title: "Status" },
          { id: "total", title: "Total" },
          // Add more fields as needed
        ],
      });
      await csvWriter.writeRecords(orders);
      res.download("orders_report.csv");
    } else if (type === "pdf") {
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream("orders_report.pdf"));
      doc.fontSize(16).text("Orders Report", { align: "center" });
      orders.forEach((order) => {
        doc
          .fontSize(12)
          .text(`Order ID: ${order.orderId} - Total: $${order.total}`);
      });
      doc.end();
      res.download("orders_report.pdf");
    } else {
      res.status(400).json({ message: "Invalid report type." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
