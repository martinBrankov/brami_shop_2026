'use client'

// components/PopularProducts.tsx
import { popularProducts, Product } from "@/data/productsData";
import Image from "next/image";
import Link from "next/link";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useState, useEffect } from "react";

type Props = {
  title?: string;
  products?: Product[];
};

export default function PopularProducts({
  title = "Популярни продукти",
  products: propsProducts = popularProducts,
}: Props) {
  const { isMobile, isReady } = useDeviceDetection();

  if (!isReady) {
    return null;
  }

  return (
    <section className="px-4 pt-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-purple-900 mb-4">
          {title}
        </h2>

        {/* Mobile: Horizontal scroll */}
        {isMobile && (
          <div
            className="
              flex gap-4
              overflow-x-auto
              snap-x snap-mandatory
              pb-3
              pl-2 pr-2
              [-webkit-overflow-scrolling:touch]
            "
          >
            {propsProducts.map((product) => {
              const ProductContent = (
                <div
                  className="
                    w-[40vw] max-w-sm
                    bg-white shadow-sm
                    rounded-2xl
                    overflow-hidden flex flex-col
                    hover:shadow-md transition-shadow
                  "
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={product.imageSrc[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="py-2 text-center text-sm text-purple-900 font-medium">
                    {product.name}
                  </div>
                </div>
              );

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="shrink-0 snap-start"
                >
                  {ProductContent}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop: 4 products grid */}
        {!isMobile && (
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
            {propsProducts.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="
                  bg-white shadow-sm
                  rounded-2xl
                  overflow-hidden flex flex-col
                  hover:shadow-md transition-shadow
                "
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.imageSrc[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="py-2 text-center text-sm text-purple-900 font-medium">
                  {product.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
