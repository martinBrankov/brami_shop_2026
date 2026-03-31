"use client";

// app/shop/[id]/page.tsx
import ProductDetails from "@/components/productsDetiles/ProductDetails";
import ProductNotFound from "@/components/productsNotFound/ProductNotFound";
import { products } from "@/data/productsData";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) return <ProductNotFound />;

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-6 pb-6">
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
    </div>
  );
}
