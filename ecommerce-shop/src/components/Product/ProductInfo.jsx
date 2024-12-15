import React from "react";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";

function ProductInfo({ product }) {
  const { id, category, title, price } = product;

  return (
    <div>
      <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
      <Link to={`/product/${id}`}>
        <h2 className="font-semibold text-secondary">{title}</h2>
      </Link>
      <ProductRating />
      <div className="text-secondary">${price}</div>
      <div className="text-sm text-gray-500 mt-1">Free Shipping</div>
    </div>
  );
}

export default ProductInfo;
