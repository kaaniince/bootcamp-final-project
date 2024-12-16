import React from "react";
import { BsCamera } from "react-icons/bs";

function ProductRating() {
  return (
    <div className="flex items-center mb-1 mt-2">
      <span className="text-primary font-bold text-sm mr-1">4.3</span>
      <div className="flex">
        {[...Array(4)].map((_, index) => (
          <span key={index} className="text-primary font-bold text-sm">
            &#9733;
          </span>
        ))}
        <span className="text-gray-300 text-sm">&#9733;</span>
      </div>
      <span className="text-gray-500 text-sm ml-2">(24291)</span>
      <BsCamera className="w-4 h-4 ml-1" />
    </div>
  );
}

export default ProductRating;
