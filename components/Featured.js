import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {product?.title}
              </h1>
              <p className="text-text mb-8 text-lg leading-relaxed line-clamp-4">
                {product?.description}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href={"/product/" + product?._id}
                  className="btn-secondary"
                >
                  Read more
                </Link>
                <button onClick={addFeaturedToCart} className="btn-primary">
                  Add to cart
                </button>
              </div>
            </div>
            <div className="md:w-1/2 bg-accent">
              <div className="h-full flex items-center justify-center p-8">
                <img
                  src={product?.images[1]}
                  alt={product?.title}
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
