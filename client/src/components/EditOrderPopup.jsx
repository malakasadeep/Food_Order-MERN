import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditOrderPopup = ({ order, onClose, onUpdate }) => {
  const [customer, setCustomer] = useState(order.customerInfo || {});
  const [delivery, setDelivery] = useState(order.deliveryInfo || {});

  const handleInputChange = (e, field, isCustomer = true) => {
    const { name, value } = e.target;
    if (isCustomer) {
      setCustomer({ ...customer, [name]: value });
    } else {
      setDelivery({ ...delivery, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedOrder = {
        ...order,
        customerInfo: customer, // Use customerInfo to update the customer details
        deliveryInfo: delivery, // Use deliveryInfo to update delivery details
      };

      const response = await axios.put(
        `http://localhost:5000/api/orders/update/${order._id}`,
        updatedOrder
      );

      onUpdate(response.data);
      Swal.fire("Success", "Order updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update order", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
        <div>
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <input
            type="text"
            name="name"
            value={customer.name || ""}
            onChange={(e) => handleInputChange(e, "name")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={customer.email || ""}
            onChange={(e) => handleInputChange(e, "email")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Email"
          />

          <input
            type="mobile"
            name="mobile"
            value={customer.mobile || ""}
            onChange={(e) => handleInputChange(e, "mobile")}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Mobile"
          />
        </div>

        {delivery && delivery.address && (
          <div>
            <h3 className="font-semibold mb-2">Delivery Information</h3>
            <input
              type="text"
              name="address"
              value={delivery.address || ""}
              onChange={(e) => handleInputChange(e, "address", false)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={delivery.city || ""}
              onChange={(e) => handleInputChange(e, "city", false)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="City"
            />
            <input
              type="text"
              name="postalCode"
              value={delivery.postalCode || ""}
              onChange={(e) => handleInputChange(e, "postalCode", false)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Postal Code"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPopup;
