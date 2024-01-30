import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product: { id, image, title, category, price, options, description },
}) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/products/${id}`, {
      state: { image, title, category, price, options, description },
    });
  };
  return (
    <li
      key={id}
      className="mx-2 rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105"
      onClick={handleClick}
    >
      <img src={image} alt="image" className="w-full" />
      <div className="pt-2 px-4 flex flex-row justify-between items-center ">
        <h2 className="font-semibold truncate text-lg">{title}</h2>
        <p className="text-lg">₩{price}</p>
      </div>
      <p className="text-sm py-2 px-4 text-gray-600">{category}</p>
    </li>
  );
}
