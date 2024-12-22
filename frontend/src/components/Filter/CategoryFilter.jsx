import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import CategoryButton from "./CategoryButton";
import SearchBar from "./SearchBar";

const CategoryFilter = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  } = useContext(ProductContext);

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded-md mt-10">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Browse By Category
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default CategoryFilter;
