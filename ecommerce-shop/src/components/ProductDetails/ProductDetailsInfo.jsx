import React from "react";

export const ProductInfo = ({
  title,
  description,
  price,
  product,
  addToCart,
}) => {
  return (
    <div className="flex-1 text-center lg:text-left">
      <h1 className="text-3xl font-bold mb-2 max-w-[400px] mx-auto lg:mx-0 lg:text-left text-secondary">
        {title}
      </h1>
      <p className="mb-8 text-secondary">{description}</p>
      <div className="mb-4 text-xl font-medium text-secondary">${price}</div>
      <button
        onClick={() => addToCart(product, product.id)}
        className="bg-primary text-white px-6 py-4 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
};
