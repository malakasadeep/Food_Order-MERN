import jsPDF from "jspdf";
import "jspdf-autotable";

const generateBill = (orderData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Order Invoice", 14, 22);

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderData.orderId}`, 14, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50);

  doc.setFontSize(16);
  doc.text("Customer Information", 14, 70);
  doc.setFontSize(12);
  doc.text(`Name: ${orderData.customerInfo.name}`, 14, 85);
  doc.text(`Email: ${orderData.customerInfo.email}`, 14, 95);
  doc.text(`Mobile: ${orderData.customerInfo.mobile}`, 14, 105);

  if (orderData.customerInfo.dineMethod === "Deliver") {
    doc.setFontSize(16);
    doc.text("Delivery Information", 14, 125);
    doc.setFontSize(12);
    doc.text(`Address: ${orderData.deliveryInfo.address}`, 14, 140);
    doc.text(`City: ${orderData.deliveryInfo.city}`, 14, 150);
    doc.text(`Postal Code: ${orderData.deliveryInfo.postalCode}`, 14, 160);
  }

  doc.setFontSize(16);
  doc.text("Order Summary", 14, 180);
  const tableColumn = ["Item", "Quantity", "Price"];
  const tableRows = orderData.items.map((item) => [
    item.title,
    item.quantity,
    `$${(item.price * item.quantity).toFixed(2)}`,
  ]);

  doc.autoTable(tableColumn, tableRows, { startY: 190 });

  doc.setFontSize(14);
  doc.text(
    `Total: $${orderData.total.toFixed(2)}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  doc.save(`order-${orderData.orderId}.pdf`);
};

export default generateBill;
