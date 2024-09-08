import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import Button from "../assets/layouts/Button";
import { Link } from "react-router-dom";

export default function FoodCard({ id, img, title, price }) {
  return (
    <Link
      to={`/menu/${id}`}
      className=" w-full lg:w-1/4 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg"
    >
      <img className=" rounded-xl" src={img} alt="img" />
      <div className=" space-y-4">
        <h3 className=" font-semibold text-center text-xl pt-6 truncate">
          {title}
        </h3>
        <div className=" flex flex-row justify-center">
          <BsStarFill className=" text-orange-600" />
          <BsStarFill className=" text-orange-600" />
          <BsStarFill className=" text-orange-600" />
          <BsStarFill className=" text-orange-600" />
          <BsStarHalf className=" text-orange-600" />
        </div>
        <div className=" flex flex-row items-center justify-center gap-4">
          <h3 className=" font-semibold text-lg">${price}</h3>
          <Button title="Buy Now" />
        </div>
      </div>
    </Link>
  );
}
