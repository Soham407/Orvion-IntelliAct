import { products } from "../../../lib/products-data";
import ProductDetailClient from "./ProductDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
