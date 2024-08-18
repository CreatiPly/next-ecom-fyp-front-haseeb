import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import SearchAndFilter from "@/components/SearchAndFilter";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default function SearchPage({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();
  const { term, category } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/search", {
          params: { term, category },
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    if (term || category) {
      fetchProducts();
    }
  }, [term, category]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <SearchAndFilter categories={categories} />
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}).lean();
  const initialProducts = await Product.find({}).limit(10).lean();

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(initialProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
