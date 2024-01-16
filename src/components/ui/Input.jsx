import React from "react";

export default function Input({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border-2 p-4 mb-2 rounded-xl"
    />
  );
}
