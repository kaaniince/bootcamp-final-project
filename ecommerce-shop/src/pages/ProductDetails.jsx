import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section className="flex justify-center items-center">
        <p className="text-primary text-4xl">Loading...</p>
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-sm"
              src={image}
              alt={title}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-2 max-w-[400px] mx-auto lg:mx-0 lg:text-left text-secondary">
              {title}
            </h1>
            <p className="mb-8 text-secondary">{description}</p>
            <div className="mb-4 text-xl font-medium text-secondary">
              ${price}
            </div>
            <button
              onClick={() => addToCart(product, product.id)}
              className="bg-primary text-white px-6 py-4 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
