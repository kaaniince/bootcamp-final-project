import React from "react";
import { Link } from "react-router-dom";

const CartItemImage = ({ id, image, title }) => {
  return (
    <Link to={`/product/${id}`}>
      <img
        className="max-w-[80px] rounded-md shadow-sm"
        src={image}
        alt={title}
      />
    </Link>
  );
};

export default CartItemImage;
