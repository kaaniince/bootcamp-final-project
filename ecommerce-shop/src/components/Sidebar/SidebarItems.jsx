import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../Cart/CartItem";

function SidebarItems() {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b border-gray-400">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </div>
  );
}

export default SidebarItems;
