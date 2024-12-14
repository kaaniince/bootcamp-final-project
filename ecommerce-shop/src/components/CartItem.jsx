import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext.jsx";

function CartItem({ item }) {
  const { id, title, amount, image, price } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  return (
    <div className="flex w-full min-h-[150px] items-center gap-x-4 py-4 lg:px-6 border-b border-gray-200 font-light text-gray-500 bg-white rounded-md shadow-sm">
      <Link to={`/product/${id}`}>
        <img
          className="max-w-[80px] rounded-md shadow-sm"
          src={image}
          alt={title}
        />
      </Link>
      <div className="w-full flex flex-col">
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
        <div className="flex gap-x-3 h-[36px] text-sm">
          <div className="flex justify-center items-center w-full h-full border max-w-[100px] rounded-md shadow-sm">
            <div
              className="flex-1 flex justify-center items-center cursor-pointer h-full"
              onClick={() => decreaseAmount(id)}
            >
              <FaMinusCircle className="text-primary" />
            </div>
            <div className="h-full flex justify-center items-center px-2">
              {amount}
            </div>
            <div
              className="flex-1 flex justify-center items-center cursor-pointer h-full"
              onClick={() => increaseAmount(id)}
            >
              <FaPlusCircle className="text-primary" />
            </div>
          </div>
          <div className="flex items-center w-full h-full justify-around text-sm">
            $ {price.toFixed(2)}
          </div>
          <div className="flex-1 flex justify-end items-center w-full h-full text-primary font-medium">
            $ {(price * amount).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
