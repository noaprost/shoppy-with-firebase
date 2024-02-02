import React from "react";
import { FaPlus } from "react-icons/fa";
import CartItem from "../components/CartItem";
import useCarts from "../hooks/useCarts";

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartsQuery: { isLoading, data: products },
  } = useCarts();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    (hasProducts &&
      products.reduce(
        // json 형태로 받아왔으므로 int 형태로 바꿔줌
        (prev, current) =>
          prev + parseInt(current.price) * parseInt(current.quantity),
        0
      )) ||
    0;

  return (
    <div className="w-3/4 mx-auto">
      <p className="text-xl font-semibold text-center my-4">내 장바구니</p>
      <hr />
      {!hasProducts && (
        <p className="text-center my-10">
          장바구니에 상품이 없습니다. 상품을 추가해주세요!
        </p>
      )}
      {hasProducts &&
        products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      <section className="flex flex-row justify-evenly items-center my-5">
        <div className="flex flex-col items-center">
          <p>상품 총액</p>
          <p className="text-orange-400">₩{totalPrice}</p>
        </div>
        <FaPlus className="w-3 h-3" />
        <div className="flex flex-col items-center">
          <p>배송액</p>
          <p className="text-orange-400">₩{SHIPPING}</p>
        </div>
        <p className="text-2xl">=</p>
        <div className="flex flex-col items-center">
          <p>총가격</p>
          <p className="text-orange-400">₩{totalPrice + SHIPPING}</p>
        </div>
      </section>
      <button className="w-full bg-orange-400 text-white p-1 rounded-md">
        주문 하기
      </button>
    </div>
  );
}
