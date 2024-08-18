import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({ featuredProduct, newProducts, categories }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts initialProducts={newProducts} categories={categories} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66ae3befd4a3389474b77538";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const categories = await Category.find({}).lean();

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
