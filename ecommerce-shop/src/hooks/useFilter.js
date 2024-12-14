import { useState, useMemo } from "react";

export const useFilter = (products) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    );
  }, [products, selectedCategory]);

  return {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
  };
};
