import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded-md mt-10">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        Categories
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <CategoryButton
          category="all"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

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

export default CategoryFilter;
