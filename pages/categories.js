import { useContext } from "react";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductBox from "@/components/ProductBox";
import { CartContext } from "@/components/CartContext";

export default function CategoriesPage({ categories, products }) {
  const { addProduct } = useContext(CartContext);

  const getCategoryChildren = (parentId) => {
    return categories.filter(
      (category) => category.parent?.toString() === parentId
    );
  };

  const renderCategoryHierarchy = (category, depth = 0) => {
    const children = getCategoryChildren(category._id.toString());
    const categoryProducts = products.filter(
      (product) => product.category?.toString() === category._id.toString()
    );

    return (
      <div key={category._id} className={`mb-${depth === 0 ? "16" : "8"}`}>
        <h3
          className={`font-bold ${
            depth === 0 ? "text-4xl text-center mb-8" : "text-2xl mb-4"
          } text-primary`}
        >
          {category.name}
        </h3>
        {children.length > 0 && (
          <div className="ml-4">
            {children.map((child) => renderCategoryHierarchy(child, depth + 1))}
          </div>
        )}
        {categoryProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {categoryProducts.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const topLevelCategories = categories.filter((category) => !category.parent);

  return (
    <>
      <Header />
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-16 text-center">
            Categories and Products
          </h1>
          <div className="bg-white shadow-md rounded-lg p-8">
            {topLevelCategories.map((category) =>
              renderCategoryHierarchy(category)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } }).lean();
  const categories = await Category.find({}).lean();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
