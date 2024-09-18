import React from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EditOrderPopup = ({ order, onClose, onUpdate }) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    Swal.fire({
      title: "Confirm Status Change",
      text: "Are you sure you want to change the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate({ ...order, status: newStatus });
        Swal.fire("Updated!", "Order status has been updated.", "success");
      }
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Order ID</label>
          <input
            type="text"
            value={order.orderId}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Processing">Processing</option>
            <option value="Delivering">Delivering</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditOrderPopup;
