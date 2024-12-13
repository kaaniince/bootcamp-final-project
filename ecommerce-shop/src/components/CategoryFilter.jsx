import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "all"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md capitalize ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
