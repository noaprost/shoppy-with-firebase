import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";

export default function ProductDetail() {
  const { id } = useParams();
  const {
    state: { image, title, category, price, options, description },
  } = useLocation();
  const [option, setOption] = useState(options && options[0]);
  const { updateCart } = useCarts();

  // 성공했는지의 여부 상태, 초기에는 아무것도 없는 상태 undefined
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };

  const handleClick = () => {
    const product = { id, image, title, price, option, quantity: 1 };
    updateCart.mutate(product, {
      onSucess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  return (
    <div>
      <section className="ml-36 py-2 flex items-center text-gray-700">
        <IoIosArrowForward />
        <p className="ml-2 text-gray-700">{category}</p>
      </section>
      <section className="flex flex-row justify-evenly">
        <img src={image} className="w-1/3 h-1/2" />
        <div className="flex flex-col w-1/3">
          <p className="font-semibold text-2xl my-2">{title}</p>
          <p className="my-2 text-lg">₩{price}</p>
          <hr />
          <p className="my-3 text-md">{description}</p>
          <section className="flex flex-row mb-5">
            <label htmlFor="select" className="p-1 text-orange-400">
              옵션 :
            </label>
            <select
              id="select"
              className="p-1 border-2 border-dotted border-orange-300 w-36 rounded-lg outline-none"
              onChange={handleChange}
              value={option}
            >
              {options.map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </select>
          </section>
          {success && <p className="my-4">✅{success}</p>}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </div>
  );
}
