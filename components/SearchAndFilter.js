

import { useState } from "react";

export default function SearchAndFilter({ categories, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  return (


    <section className="mb-8 bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-grow input-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-grow md:flex-grow-0 md:w-1/3 input-primary appearance-none bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="flex-grow md:flex-grow-0 btn-primary">
          Search
        </button>
      </form>
    </section>
  );
}
