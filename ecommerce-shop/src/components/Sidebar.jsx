import React from "react";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
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
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center "
          onClick={handleClose}
        >
          <IoMdClose className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>

      <div className="flex flex-col gap-y-4 px-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold uppercase">
            <span className="mr-2">Total:</span> ${parseFloat(total).toFixed(2)}
          </div>

          <div
            className="cursor-pointer py-4 bg-rose-600 text-white w-12 h-12 flex justify-center items-center text-xl"
            onClick={clearCart}
          >
            <FiTrash2 className="text-primary" />
          </div>
        </div>
        <Link
          to="/"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View Cart
        </Link>
        <Link
          to="/"
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
