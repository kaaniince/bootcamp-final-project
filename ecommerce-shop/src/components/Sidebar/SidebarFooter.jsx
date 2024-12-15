import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";

function SidebarFooter() {
  const { clearCart, total } = useContext(CartContext);

  return (
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
  );
}

export default SidebarFooter;
