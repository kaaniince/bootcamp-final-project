import React, { useMemo, useContext } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

const CartItemQuantity = ({
  id,
  amount,
  price,
  increaseAmount,
  decreaseAmount,
}) => {
  const { user } = useContext(AuthContext);
  const totalPrice = useMemo(() => {
    return price * amount;
  }, [price, amount]);

  return (
    <div className="flex gap-x-3 h-[36px] text-sm items-center">
      <div className="flex justify-center items-center w-full h-full border max-w-[100px] rounded-md shadow-sm">
        <div
          onClick={() => decreaseAmount(id, user?.id)}
          className="flex-1 h-full flex justify-center items-center cursor-pointer"
        >
          <FaMinusCircle className="text-primary" />
        </div>
        <div className="h-full flex justify-center items-center px-2">
          {amount}
        </div>
        <div
          onClick={() => increaseAmount(id, user?.id)}
          className="flex-1 h-full flex justify-center items-center cursor-pointer"
        >
          <FaPlusCircle className="text-primary" />
        </div>
      </div>
      <div className="flex items-center justify-end text-sm w-full">
        $ {price.toFixed(2)}
      </div>
      <div className="flex items-center justify-end text-primary font-medium w-full">
        $ {totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItemQuantity;
