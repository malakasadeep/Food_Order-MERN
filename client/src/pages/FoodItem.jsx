// src/pages/FoodItem.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import fooddata from "../data/foods";
import FoodCard from "../components/FoodCard";
import Swal from "sweetalert2";

const FoodItem = () => {
  const { id } = useParams();
  const foodItem = fooddata.find((dish) => dish.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    try {
      const cartItem = {
        userId: "user001", // Static user ID for demonstration
        itemId: foodItem.id,
        title: foodItem.title,
        img: foodItem.img,
        price: foodItem.price,
        quantity,
      };

      // Save to local storage or send to the backend API
      // For demonstration, using localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show success alert box with options using SweetAlert2
      Swal.fire({
        title: "Item added to cart successfully!",
        text: "Would you like to view your cart or add more items?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Go to Cart",
        cancelButtonText: "Add More",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to cart page
          window.location.href = "/cart";
        }
      });
    } catch (error) {
      // Show error alert box
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the item to the cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBuyNow = () => {
    // Logic to buy the item immediately
  };

  const recommendedItems = fooddata.filter((dish) => dish.id !== foodItem.id);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center ">
      <div className="w-2/3 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <img
            className="rounded-xl w-full transition-transform duration-300 transform hover:scale-105"
            src={foodItem.img}
            alt={foodItem.title}
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-semibold">{foodItem.title}</h1>
          <p className="text-lg text-gray-600">{foodItem.description}</p>
          <h2 className="text-2xl font-semibold">${foodItem.price}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecrease}
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              +
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/3 mt-16 ">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="overflow-x-hidden whitespace-nowrap mb-5">
          <div className="flex space-x-4 animate-marquee">
            {recommendedItems.map((item) => (
              <FoodCard
                key={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
