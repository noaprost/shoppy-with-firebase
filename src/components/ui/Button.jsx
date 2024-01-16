import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="text-white bg-orange-400 px-3 py-1 text-center rounded-md font-semibold hover:bg-orange-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
