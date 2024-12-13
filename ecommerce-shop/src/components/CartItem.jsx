import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../contexts/CartContext.jsx";

function CartItem({ item }) {
  const { id, title, amount, image, price } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  return (
    <div className="flex w-full min-h-[150px] items-center gap-x-4 py-4 lg:px-6 border-b border-gray-200 font-light text-gray-500">
      <Link to={`/product/${id}`}>
        <img className="max-w-[80px]" src={image} alt={title} />
      </Link>
      <div className="w-full flex flex-col">
        <div className="flex justify-between mb-2">
          <Link
            to={`/product/${id}`}
            className="text-sm uppercase font-medium max-w-[240px] hover:underline text-primary transition-all duration-300"
          >
            {title}
          </Link>
          <div
            className="text-xl cursor-pointer"
            onClick={() => removeFromCart(id)}
          >
            <IoMdClose className="text-gray-500 hover:text-red-500 transition-all duration-300" />
          </div>
        </div>
        <div className="flex gap-x-2 h-[36px] text-sm">
          <div className="flex justify-center items-center w-full h-full border max-w-[100px] ">
            <div
              className="flex-1 flex justify-center items-center cursor-pointer h-full"
              onClick={() => decreaseAmount(id)}
            >
              <IoMdRemove className="text-primary" />
            </div>
            <div className="h-full flex justify-center items-center px-2">
              {amount}
            </div>
            <div
              className="flex-1 h-full flex justify-center items-center cursor-pointer h-full"
              onClick={() => increaseAmount(id)}
            >
              <IoMdAdd className="text-primary" />
            </div>
          </div>
          <div className="flex items-center w-full h-full justify-around">
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
