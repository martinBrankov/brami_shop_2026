"use client";

// components/ProductDetails.tsx
import Image from "next/image";
import { useState } from "react";
import { Comment } from "@/data/productsData";
import { Product } from "@/data/productsData";
import { useCart } from "@/contexts/CartContext";

type ProductDetailsProps = {
  name: string;
  imageSrc: any;
  price: string;
  description: string;
  rating: number;
  comments: Comment[];
  packaging: string;
  product?: Product;
};

export default function ProductDetails({
  name,
  imageSrc,
  price,
  description,
  rating,
  comments: review,
  packaging,
  product,
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  return (
    <section className="px-4 py-6 bg-white rounded-3xl shadow-sm max-w-5xl mx-auto">
      <div className="flex flex-col gap-6">
        
        {/* Снимка и заглавие */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

          {/* СНИМКА */}
          <div className="relative w-[220px] h-[220px] lg:w-[400px] lg:h-[400px] shrink-0 self-center">
            <Image
              src={imageSrc[0]}
              alt={name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          {/* ДЯСНА ЧАСТ */}
          <div className="flex flex-col justify-between text-purple-900 w-full flex-1 min-w-0 sm:h-[220px] lg:h-[400px]">

            {/* ГОРНА СЕКЦИЯ */}
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-semibold text-center sm:text-left break-words">
                {name}
              </h1>

              <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 fill-current ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-purple-700/80 ml-2">
                  ({rating} от {review.length} оценки)
                </span>
              </div>

              <div className="text-sm text-purple-700/80 text-center sm:text-left">
                Разфасовка: {packaging}
              </div>
            </div>

            {/* ДОЛНА СЕКЦИЯ (СЪС СЪЩАТА ШИРИНА КАТО СНИМКАТА) */}
            <div className="w-[220px] lg:w-[400px] flex flex-col gap-3 mt-4 sm:mt-0 self-center sm:self-start">
              
              <div className="text-lg font-semibold text-center sm:text-left">
                {price}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center hover:bg-purple-300 transition-colors text-sm font-medium"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-1 text-center border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center hover:bg-purple-300 transition-colors text-sm font-medium"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-2 rounded-lg bg-[#e84356] text-white text-sm font-medium shadow-md hover:bg-[#d63845] transition-colors"
              >
                Добави в количката
              </button>

            </div>
          </div>
        </div>

        {/* Информация с табове */}
        <div className="w-full">
          {/* Табове */}
          <div className="flex border-b border-purple-200 mb-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'text-purple-900 border-purple-900'
                  : 'text-purple-600 border-transparent hover:text-purple-800'
              }`}
            >
              Описание
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'text-purple-900 border-purple-900'
                  : 'text-purple-600 border-transparent hover:text-purple-800'
              }`}
            >
              Коментари ({review.length})
            </button>
          </div>

          {/* Съдържание на табовете */}
          <div className="text-purple-900">
            {activeTab === 'description' && (
              <div 
                className="text-sm text-purple-700/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Форма за коментар */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Добавете коментар</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Оценка</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="p-1"
                          >
                            <svg
                              className="w-5 h-5 text-yellow-400 fill-current hover:text-yellow-500 transition-colors"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Име</label>
                      <input
                        type="text"
                        placeholder="Вашето име"
                        className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Коментар</label>
                      <textarea
                        placeholder="Споделете мнението си за продукта..."
                        rows={3}
                        className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-purple-900 text-white text-sm font-medium rounded-lg hover:bg-purple-800 transition-colors"
                    >
                      Изпрати коментар
                    </button>
                  </div>
                </div>

                {/* Съществуващи коментари */}
                <div className="space-y-4">
                  {review.length === 0 ? (
                    <div className="text-sm text-purple-700/80">
                      Все още няма коментари за този продукт. Бъдете първи, който ще сподели мнението си!
                    </div>
                  ) : (
                    review.map((comment, index) => (
                      <div key={index} className="border-l-2 border-purple-200 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 fill-current ${
                                  star <= comment.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-purple-600">{comment.name}</span>
                          <span className="text-xs text-purple-500">{comment.data}</span>
                        </div>
                        <p className="text-sm text-purple-700/80">
                          {comment.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
