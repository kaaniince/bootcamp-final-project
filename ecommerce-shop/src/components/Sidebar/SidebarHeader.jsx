import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";

function SidebarHeader() {
  const { handleClose } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  return (
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
  );
}

export default SidebarHeader;
