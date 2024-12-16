import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

function Product({ product }) {
  return (
    <div>
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  );
}

export default Product;
