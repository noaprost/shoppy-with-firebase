import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../components/ui/Button";

export default function ProductDetail() {
  const { id } = useParams();
  const {
    state: { image, title, category, price, options, description },
  } = useLocation();
  const [option, setOption] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };
  return (
    <div>
      <section className="ml-36 py-2 flex items-center">
        <IoIosArrowForward />
        <p className="ml-2">{category}</p>
      </section>
      <section className="flex flex-row justify-evenly">
        <img src={image} className="w-1/3 h-1/2" />
        <div className="flex flex-col w-1/3">
          <p className="font-semibold text-2xl my-2">{title}</p>
          <p className="my-2 text-lg">₩{price}</p>
          <hr />
          <p className="my-3 text-md">{description}</p>
          <section className="flex flex-row my-5">
            <p className="p-1">옵션 :</p>
            <select
              className="p-1 border-2 border-dotted border-orange-300 w-36 rounded-lg outline-none"
              onChange={handleChange}
            >
              {options.map((item, idx) => (
                <option key={idx}>{item}</option>
              ))}
            </select>
          </section>
          <Button text="장바구니에 추가" />
        </div>
      </section>
    </div>
  );
}
