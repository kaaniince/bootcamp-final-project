import React, { useContext } from "react";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import { SidebarContext } from "../../contexts/SidebarContext";

const CartIcon = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer flex relative items-center"
    >
      <BsBag className="text-3xl text-primary hover:text-primary-dark transition-colors duration-300" />
      <div className="bg-primary absolute -right-3 -bottom-3 text-xs w-5 h-5 rounded-full text-white flex justify-center items-center">
        {itemAmount}
      </div>
    </div>
  );
};

export default CartIcon;
