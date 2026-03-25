"use client";

// app/shop/page.tsx
import { products } from "@/data/productsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

// Helper функция за премахване на HTML тагове (SSR safe)
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<('hair' | 'body' | 'face')[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<'brami' | 'vodica' | 'other' | null>(null);
  const router = useRouter();
  const { addToCart } = useCart();

  const categories = [
    { id: 'all' as const, name: 'Всички' },
    { id: 'hair' as const, name: 'Коса' },
    { id: 'body' as const, name: 'Тяло' },
    { id: 'face' as const, name: 'Лице' }
  ];

  const brands = [
    { id: 'all' as const, name: 'Всички' },
    { id: 'brami' as const, name: 'Brami' },
    { id: 'vodica' as const, name: 'Vodica' },
    { id: 'other' as const, name: 'Други' }
  ];

  const toggleCategory = (categoryId: 'all' | 'hair' | 'body' | 'face') => {
    if (categoryId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const toggleBrand = (brandId: 'all' | 'brami' | 'vodica' | 'other') => {
    if (brandId === 'all') {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brandId);
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.some(selectedCategory => 
        product.category.includes(selectedCategory)
      );
    
    const brandMatch = selectedBrand === null || product.brand === selectedBrand;
    
    return categoryMatch && brandMatch;
  });

  const handleBuyNow = (product: any, e: React.MouseEvent) => {
    // Stop link navigation and only add to cart
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 pt-6 pb-6">
      <div className="max-w-5xl mx-auto">
        {/* Филтри */}
        <div className="mb-3">
          <div className="text-sm font-medium text-purple-900 mb-2">Категории</div>
          <div className="flex gap-1 justify-start flex-wrap mb-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  category.id === 'all' 
                    ? selectedCategories.length === 0
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                    : selectedCategories.includes(category.id)
                      ? 'bg-purple-400 text-white'
                      : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="text-sm font-medium text-purple-900 mb-2">Брандове</div>
          <div className="flex gap-1 justify-start flex-wrap">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => toggleBrand(brand.id)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  brand.id === 'all' 
                    ? selectedBrand === null
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                    : selectedBrand === brand.id
                      ? 'bg-purple-400 text-white'
                      : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Гъвкав grid с центриране и max-width 150px */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="bg-white shadow-sm rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow w-full max-w-[200px]"
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

                {/* кратко описание между име и цена */}
                <p className="text-xs text-purple-700/80 leading-snug line-clamp-2">
                  {stripHtml(product.description)}
                </p>

                <div className="text-sm text-purple-700 mt-1">
                  {product.price}
                </div>

                <button 
                  onClick={(e) => handleBuyNow(product, e)}
                  className="mt-2 inline-flex items-center justify-center w-full py-2 rounded-lg bg-[#e84356] text-white text-xs font-medium shadow-sm hover:bg-[#d63748] transition-colors"
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
