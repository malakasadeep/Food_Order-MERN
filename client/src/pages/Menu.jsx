import React from "react";
import FoodCard from "../components/FoodCard";
import fooddata from "../data/foods";

export default function Menu() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
        Our Foods
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {fooddata.map((dish) => (
          <FoodCard
            key={dish.id}
            id={dish.id}
            img={dish.img}
            title={dish.title}
            price={dish.price}
            description={dish.description}
          />
        ))}
      </div>
    </div>
  );
}
