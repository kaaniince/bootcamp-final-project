import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEye } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
//import { ENDPOINTS } from "../constants";

function ProductImage({ product }) {
  const { addToCart } = useContext(CartContext);
  const { id, image, title } = product;

  return (
    <div className="border border-[e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[200px] mx-auto flex justify-center items-center">
          <img
            src={image}
            alt={title}
            className="max-h-[160px] group-hover:scale-110 transition-all duration-300"
          />
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, id)}>
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
  );
}

export default ProductImage;
