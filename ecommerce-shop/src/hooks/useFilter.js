import { useState, useMemo } from "react";

export const useFilter = (products) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        selectedCategory === "all"
          ? true
          : product.category === selectedCategory
      )
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, selectedCategory, searchTerm]);

  return {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  };
};
