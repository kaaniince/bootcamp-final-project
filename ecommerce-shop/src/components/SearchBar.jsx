import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const { setSearchTerm } = useContext(ProductContext);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  // Debounce search term
  const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

  // Update context search term when debounced value changes
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;
