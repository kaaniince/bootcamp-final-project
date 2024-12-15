import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import CategoryButton from "./CategoryButton";

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

export default CategoryFilter;
