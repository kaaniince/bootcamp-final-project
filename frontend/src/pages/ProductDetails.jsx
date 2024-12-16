import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";
import DetailsImage from "../components/ProductDetails/DetailsImage";
import DetailsInfo from "../components/ProductDetails/DetailsInfo";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const product = useMemo(() => {
    return products.find((item) => item.id === parseInt(id));
  }, [products, id]);

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <DetailsImage image={image} title={title} />
          <DetailsInfo
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
