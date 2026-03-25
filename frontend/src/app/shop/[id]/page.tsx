"use client";

// app/shop/[id]/page.tsx
import ProductDetails from "@/components/ProductDetails";
import ProductNotFound from "@/components/ProductNotFound";
import { products } from "@/data/productsData";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) return <ProductNotFound />;

  return (
    <ProductDetails
      name={product.name}
      imageSrc={product.imageSrc}
      price={product.price}
      description={product.description}
      comments={product.comments}
      rating={product.rating}
      packaging={product.packaging}
      product={product}
    />
  );
}
