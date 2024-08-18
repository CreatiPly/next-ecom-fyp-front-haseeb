import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category"; // Add this line
import ProductImages from "@/components/ProductImages";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { formatPrice } from "@/utils/priceFormatter";
import Link from "next/link";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  const getCategoryPath = (category) => {
    let path = [category.name];
    let currentCategory = category;
    while (currentCategory.parent) {
      path.unshift(currentCategory.parent.name);
      currentCategory = currentCategory.parent;
    }
    return path.join(" > ");
  };

  return (
    <>
      <Header />
      <div className="bg-background py-12 w-screen h-screen">
        <div className="container mx-auto px-4">
          <div className="md:flex md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <ProductImages images={product.images} />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-primary mb-4">
                {product.title}
              </h1>
              {product.category && (
                <p className="text-sm text-gray-600 mb-2">
                  Category:{" "}
                  <Link
                    href={`/category/${product.category._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {getCategoryPath(product.category)}
                  </Link>
                </p>
              )}
              <p className="text-text mb-6">{product.description}</p>

              {/* Properties Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.properties).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col bg-gray-100 p-2 rounded"
                    >
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                <button
                  onClick={() => addProduct(product._id)}
                  className="btn-cta"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id)
    .populate({
      path: "category",
      model: Category,
      populate: {
        path: "parent",
        model: Category,
      },
    })
    .lean();

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
