import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import SearchAndFilter from "@/components/SearchAndFilter";

export default function ProductsPage({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("/api/search", {
          params: { term: searchTerm, category: selectedCategory },
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(
          "An error occurred while fetching products. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSelectedCategory(category);
  };

  return (
    <>
      <Header />
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            All Products
          </h1>
          <SearchAndFilter categories={categories} onSearch={handleSearch} />
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <p className="text-center text-lg mt-8">
              No products found. Please try a different search term or category.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const categories = await Category.find({}).lean();

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
