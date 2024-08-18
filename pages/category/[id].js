import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductBox from "@/components/ProductBox";

export default function CategoryPage({ category, products }) {
  return (
    <>
      <Header />
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-6">
            {category.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const category = await Category.findById(id).lean();

  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = await Product.find({ category: id }).lean();

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
