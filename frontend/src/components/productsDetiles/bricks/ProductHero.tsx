"use client";

import Image from "next/image";

interface ProductHeroProps {
  imageSrc: any;
  name: string;
  packaging: string;
  price: string;
  quantity: number;
  rating: number;
  reviewCount: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProductHero({
  imageSrc,
  name,
  packaging,
  price,
  quantity,
  rating,
  reviewCount,
  onQuantityChange,
  onAddToCart,
}: ProductHeroProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <div className="relative w-[220px] h-[220px] lg:w-[400px] lg:h-[400px] shrink-0 self-center">
        <Image
          src={imageSrc[0]}
          alt={name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col justify-between text-purple-900 w-full flex-1 min-w-0 sm:h-[220px] lg:h-[400px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-center sm:text-left break-words">
            {name}
          </h1>

          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                className={`w-4 h-4 fill-current ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="text-sm text-purple-700/80 ml-2">
              ({rating} от {reviewCount} оценки)
            </span>
          </div>

          <div className="text-sm text-purple-700/80 text-center sm:text-left">
            Разфасовка: {packaging}
          </div>
        </div>

        <div className="w-[220px] lg:w-[400px] flex flex-col gap-3 mt-4 sm:mt-0 self-center sm:self-start">
          <div className="text-lg font-semibold text-center sm:text-left">
            {price}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="app-icon-button h-8 w-8 text-sm font-medium"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={event =>
                onQuantityChange(Math.max(1, parseInt(event.target.value) || 1))
              }
              className="w-16 px-2 py-1 text-center border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              min="1"
            />
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="app-icon-button h-8 w-8 text-sm font-medium"
            >
              +
            </button>
          </div>

          <button
            onClick={onAddToCart}
            className="app-button-primary w-full py-2 shadow-md"
          >
            Добави в количката
          </button>
        </div>
      </div>
    </div>
  );
}
