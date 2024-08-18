import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  const { term, category } = req.query;

  let query = {};

  if (term) {
    query.title = { $regex: term, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query).limit(50).lean();

  res.json(products);
}
