import React, { useContext } from "react";

// import components
import Hero from "../components/Hero";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { ProductContext } from "../contexts/ProductContext";

function Home() {
  const { products, isLoading } = useContext(ProductContext);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
