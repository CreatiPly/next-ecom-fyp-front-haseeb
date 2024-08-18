import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { formatPrice } from "@/utils/priceFormatter";

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (


    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full">
      <Link href={url} className="block flex-shrink-0">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-full object-contain"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={url}
          className="text-lg font-semibold text-text hover:text-primary transition-colors mb-2"
        >
          {title}
        </Link>
        <div className="mt-auto flex flex-wrap justify-between items-center gap-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(price)}
          </span>
          <button
            onClick={() => addProduct(_id)}
            className="btn-secondary md:w-full w-full sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
