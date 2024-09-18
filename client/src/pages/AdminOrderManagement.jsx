import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaSyncAlt, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
//import animationData from "./animation.json";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("csv");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders/all");
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
        console.error("Expected an array, but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/orders/delete/${orderId}`);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete order", "error");
      }
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put("/api/orders/status", { orderId, status });
      fetchOrders();
      Swal.fire("Updated!", "Order status has been updated.", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReportDownload = async () => {
    try {
      const response = await axios.get(
        `/api/orders/report?type=${reportType}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `orders_report.${reportType}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      Swal.fire("Error", "Failed to download report", "error");
    }
  };

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setShowEditPopup(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8 w-full lg:w-3/4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <input
        type="text"
        placeholder="Search by Order ID"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => order.orderId.includes(searchTerm))
            .map((order) => (
              <tr key={order._id}>
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.customerInfo.name}</td>
                <td className="border p-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                    className={`border p-1 ${
                      order.status === "Pending"
                        ? "bg-yellow-200"
                        : order.status === "Approved"
                        ? "bg-blue-200"
                        : order.status === "Processing"
                        ? "bg-orange-200"
                        : order.status === "Delivering"
                        ? "bg-purple-200"
                        : "bg-green-200"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleViewMore(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4">
        <select
          className="border p-2"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="csv">CSV</option>
          <option value="pdf">PDF</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleReportDownload}
        >
          Download Report
        </button>
      </div>
      {showEditPopup && selectedOrder && (
        <EditOrderPopup
          order={selectedOrder}
          onClose={() => setShowEditPopup(false)}
          onUpdate={(updatedOrder) => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
              )
            );
            setShowEditPopup(false);
          }}
        />
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        //animationData: animationData,
      }}
      height={100}
      width={100}
    />
  </div>
);

export default AdminOrderManagement;
