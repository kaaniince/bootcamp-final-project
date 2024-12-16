// src/contexts/ProductContext.jsx
import { createContext, useMemo } from "react";
import { useProduct } from "../hooks/useProduct";
import { useFilter } from "../hooks/useFilter";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { products, isLoading, categories, error } = useProduct();
  const { filteredProducts, selectedCategory, setSelectedCategory } =
    useFilter(products);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      products: filteredProducts,
      isLoading,
      categories,
      error,
      selectedCategory,
      setSelectedCategory,
    }),
    [filteredProducts, isLoading, categories, error, selectedCategory]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
