import React from "react";

const CategoryButton = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => (
  <button
    onClick={() => setSelectedCategory(category)}
    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
      selectedCategory === category
        ? "bg-primary text-white"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
  >
    {category === "all" ? "All" : category}
  </button>
);

export default CategoryButton;
