import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const CartItemDetails = ({ id, title, removeFromCart }) => {
  return (
    <div className="flex justify-between mb-2">
      <Link
        to={`/product/${id}`}
        className="text-sm uppercase font-medium max-w-[200px] hover:underline text-primary transition-all duration-300"
      >
        {title}
      </Link>
      <div
        className="text-xl cursor-pointer"
        onClick={() => removeFromCart(id)}
      >
        <FaTrashAlt className="text-gray-500 hover:text-red-500 transition-all duration-300" />
      </div>
    </div>
  );
};

export default CartItemDetails;
