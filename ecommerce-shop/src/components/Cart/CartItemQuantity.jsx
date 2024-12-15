import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const CartItemQuantity = ({
  id,
  amount,
  price,
  increaseAmount,
  decreaseAmount,
}) => {
  return (
    <div className="flex gap-x-3 h-[36px] text-sm items-center">
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
      <div className="flex items-center justify-end text-sm w-full">
        $ {price.toFixed(2)}
      </div>
      <div className="flex items-center justify-end text-primary font-medium w-full">
        $ {(price * amount).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItemQuantity;
