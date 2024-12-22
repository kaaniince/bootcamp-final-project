import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-brown-500 focus:ring-brown-500"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-500" />
    </div>
  );
};

export default SearchBar;
