import React, { useContext } from "react";

// import components
import Hero from "../components/Hero/Hero";
import Product from "../components/Product/Product";
import CategoryFilter from "../components/Filter/CategoryFilter";
import Advertising from "../components/Advertising/Advertising";
import Announcement from "../components/Announcement/Announcement";
import Loading from "../components/Loading/Loading";
import Newsletter from "../components/Newsletter/NewsLetter";
import BrandShowcase from "../components/BrandShowcase/BrandShowcase";
import { ProductContext } from "../contexts/ProductContext";

function Home() {
  const { products, isLoading } = useContext(ProductContext);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Announcement />
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4">
            <Advertising />
            <CategoryFilter />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 mt-8">
            {products && products.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">
                No products found.
              </p>
            ) : (
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
        <Newsletter />
        <BrandShowcase />
      </section>
    </div>
  );
}

export default Home;
