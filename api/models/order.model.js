const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  items: [
    {
      itemId: String,
      title: String,
      quantity: Number,
      price: Number,
      img: String,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  customerInfo: {
    name: String,
    email: String,
    mobile: String,
    dineMethod: {
      type: String,
      enum: ["Take Away", "Dine In", "Deliver"],
      default: "Take Away",
    },
  },
  deliveryInfo: {
    address: String,
    city: String,
    postalCode: String,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card"],
    required: true,
  },
  cardInfo: {
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
