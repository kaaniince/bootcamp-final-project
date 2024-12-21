import { useState, useEffect } from "react";
import { ENDPOINTS } from "../constants";

export const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response2 = await fetch(ENDPOINTS.PRODUCTS.GET_ALL);
        const data2 = await response2.json();
        console.log("Raw response:", data2); // Gelen ham veriyi kontrol et

        // Eğer data array değilse ve response içindeyse
        const products = Array.isArray(data2) ? data2 : data2.response || [];
        console.log("Processed products:", products); // İşlenmiş veriyi kontrol et

        // Gelen _id yi id yap
        const processedProducts = products.map((product) => ({
          ...product,
          id: product._id,
          _id: undefined,
        }));

        setProducts(processedProducts);
        const uniqueCategories = [
          ...new Set(processedProducts.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (error) {
        console.log("Fetch error:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, isLoading, categories };
};
