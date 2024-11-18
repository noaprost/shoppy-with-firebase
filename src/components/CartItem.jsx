import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import useCarts from "../hooks/useCarts";

export default function CartItem({
  product,
  product: { id, image, title, option, price, quantity },
}) {
  const { updateCart, deleteCart } = useCarts();

  const handleMinus = () => {
    if (quantity < 2) return;
    updateCart.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    updateCart.mutate({ ...product, quantity: quantity + 1 });
  
  const handleDelete = () => deleteCart.mutate(id);

  return (
    <div>
      <section className="flex flex-row justify-between my-5">
        <div className="flex flex-row">
          <img src={image} alt={title} className="w-24 h-32 mr-4" />
          <div className="flex flex-col justify-center">
            <p>{title}</p>
            <p className="text-orange-400">{option}</p>
            <p>₩{price}</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button
            className="outline-none bg-orange-400 hover:bg-orange-500 rounded-full h-fit w-6 text-white"
            onClick={handleMinus}
          >
            -
          </button>
          <p className="mx-4">{quantity}</p>
          <button
            className="outline-none bg-orange-400 hover:bg-orange-500 rounded-full h-fit w-6 text-white"
            onClick={handlePlus}
          >
            +
          </button>
          <button className="ml-4" onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      </section>
      <hr />
    </div>
  );
}
