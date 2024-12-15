import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";
import { ProductDetailsImage } from "../components/ProductDetails/ProductDetailsImage";
import { ProductDetailsInfo } from "../components/ProductDetails/ProductDetailsInfo";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(id));

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <ProductDetailsImage image={image} title={title} />
          <ProductDetailsInfo
            title={title}
            description={description}
            price={price}
            product={product}
            addToCart={addToCart}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
