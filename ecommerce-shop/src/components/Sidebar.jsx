import React from "react";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import CartItem from "./CartItem";
import { CartContext } from "../contexts/CartContext.jsx";

function Sidebar() {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[25vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b border-gray-400">
        <div className="uppercase text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FaShoppingCart className="text-lg" />
          Shopping Bag ({itemAmount})
        </div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          onClick={handleClose}
        >
          <IoMdClose className="text-2xl text-gray-600" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b border-gray-400">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>

      <div className="flex flex-col gap-y-4 px-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold uppercase text-gray-700">
            <span className="mr-2">Total:</span> ${parseFloat(total).toFixed(2)}
          </div>

          <div
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl rounded-full hover:bg-red-600 transition-colors"
            onClick={clearCart}
          >
            <FiTrash2 className="text-white" />
          </div>
        </div>
        <Link
          to="/"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          View Cart
        </Link>
        <Link
          to="/"
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FaCheckCircle className="mr-2" />
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
