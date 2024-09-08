// src/components/Sidebar.js
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 transition-width duration-300`}
    >
      <div className="flex items-center justify-center h-16">
        <FaBars
          onClick={toggleSidebar}
          className="text-white cursor-pointer"
          size={24}
        />
      </div>
      <nav className={`${isOpen ? "block" : "hidden"} mt-4 space-y-2`}>
        <NavLink
          to="/menu"
          className="block py-2 px-4 text-white hover:bg-gray-600"
        >
          Menu
        </NavLink>
        <NavLink
          to="/my-orders"
          className="block py-2 px-4 text-white hover:bg-gray-600"
        >
          Orders
        </NavLink>
        <NavLink
          to="/cart"
          className="block py-2 px-4 text-white hover:bg-gray-600"
        >
          Cart
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
