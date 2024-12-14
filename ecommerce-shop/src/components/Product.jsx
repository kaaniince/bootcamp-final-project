import React, { useContext } from "react";

// import Link
import { Link } from "react-router-dom";

// import icons
import { BsPlus, BsEye, BsCamera } from "react-icons/bs";

import { CartContext } from "../contexts/CartContext";

function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;
  return (
    <div>
      <div className="border border-[e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="max-h-[160px] group-hover:scale-110 transition-all duration-300"
            />
          </div>
          <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex  flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() => {
                addToCart(product, id);
              }}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-primary">
                <BsPlus className="text-3xl" />
              </div>
            </button>
            <Link
              to={`/product/${id}`}
              className="w-12 h-12 bg-white flex items-center justify-center text-secondary drop-shadow-xl"
            >
              <BsEye />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold text-secondary">{title}</h2>
        </Link>
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
        <div className="text-secondary">${price}</div>
        <div className="text-sm text-gray-500 mt-1">Free Shipping</div>
      </div>
    </div>
  );
}

export default Product;
