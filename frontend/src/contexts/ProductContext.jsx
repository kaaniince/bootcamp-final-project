// src/contexts/ProductContext.jsx
import { createContext, useMemo, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useFilter } from "../hooks/useFilter";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { products, isLoading, categories, error } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const { filteredProducts, selectedCategory, setSelectedCategory } =
    useFilter(products);

  const searchedAndFilteredProducts = useMemo(() => {
    return filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredProducts, searchTerm]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      products: searchedAndFilteredProducts,
      isLoading,
      categories,
      error,
      selectedCategory,
      setSelectedCategory,
      searchTerm,
      setSearchTerm,
    }),
    [
      searchedAndFilteredProducts,
      isLoading,
      categories,
      error,
      selectedCategory,
      searchTerm,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
