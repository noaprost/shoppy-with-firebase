import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import useCarts from "../hooks/useCarts";

export default function CartsStatus() {
  const {
    cartsQuery: { data: products },
  } = useCarts();
  return (
    <div className="relative">
      <FiShoppingCart className="w-7 h-7 p-1" />
      {products && (
        <p className="absolute top-0 -right-1 bg-orange-400 rounded-full w-3 h-3 text-center text-xs font-bold">
          {products.length}
        </p>
      )}
    </div>
  );
}
