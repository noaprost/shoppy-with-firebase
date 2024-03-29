import React from "react";
import banner from "../image/shoppy-banner.jpg";
import Products from "../components/Products";

export default function Home() {
  return (
    <>
      {/* main banner */}
      <section className="relative h-96 mt-3 ">
        <img src={banner} alt="banner" className="w-full h-full" />
        <div className="absolute top-32 text-orange-50 w-full text-center">
          <p className="text-7xl mb-5 animate-slider drop-shadow-xl">
            Shopping With Us
          </p>
          <p className="text-3xl animate-slider font-semibold drop-shadow-xl">
            Best fit, High Quality
          </p>
        </div>
      </section>
      {/* products */}
      <section>
        <Products />
      </section>
    </>
  );
}
