"use client";

import { products } from "@/data/productsData";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import ProductFilters from "./bricks/ProductFilters";
import { useProductFilters } from "./bricks/useProductFilters";

const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

export default function ProductsCatalog() {
  const { addToCart } = useCart();
  const {
    filteredProducts,
    selectedBrand,
    selectedCategories,
    toggleBrand,
    toggleCategory,
  } = useProductFilters(products);

  const handleBuyNow = (product: any, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-6 pb-6">
      <div className="page-shell">
        <ProductFilters
          selectedCategories={selectedCategories}
          selectedBrand={selectedBrand}
          onCategoryToggle={toggleCategory}
          onBrandToggle={toggleBrand}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="bg-white/80 border border-purple-100 shadow-sm rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow backdrop-blur-xl supports-[backdrop-filter]:bg-white/65 w-full max-w-[200px]"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={product.imageSrc[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3 flex flex-col gap-1">
                <div className="text-sm font-medium text-purple-900 min-h-[2.5rem] flex items-start">
                  {product.name}
                </div>

                <p className="text-xs text-purple-700/80 leading-snug line-clamp-2">
                  {stripHtml(product.description)}
                </p>

                <div className="text-sm text-purple-700 mt-1">
                  {product.price}
                </div>

                <button
                  onClick={event => handleBuyNow(product, event)}
                  className="app-button-primary mt-2 w-full py-2 shadow-sm"
                >
                  Купи
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

