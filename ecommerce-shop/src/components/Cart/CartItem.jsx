import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";
import CartItemImage from "./CartItemImage";
import CartItemDetails from "./CartItemDetails";
import CartItemQuantity from "./CartItemQuantity";

function CartItem({ item }) {
  const { id, title, amount, image, price } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <div className="flex w-full min-h-[150px] items-center gap-x-4 py-4 lg:px-6 border-b border-gray-200 font-light text-gray-500 bg-white rounded-md shadow-sm">
      <CartItemImage id={id} image={image} title={title} />
      <div className="w-full flex flex-col">
        <CartItemDetails
          id={id}
          title={title}
          removeFromCart={removeFromCart}
        />
        <CartItemQuantity
          id={id}
          amount={amount}
          price={price}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
      </div>
    </div>
  );
}

export default CartItem;
