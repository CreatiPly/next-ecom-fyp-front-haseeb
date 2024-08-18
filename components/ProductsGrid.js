import ProductBox from "@/components/ProductBox";

export default function ProductsGrid({ products }) {
  return (

    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.length > 0 &&
        products.map((product) => (
          <li key={product._id}>
            <ProductBox {...product} />
          </li>
        ))}
    </ul>
  );
}
