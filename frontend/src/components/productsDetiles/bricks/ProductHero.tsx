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
        <div className="flex flex-col gap-1.5 lg:gap-3">
          <h1 className="text-lg font-semibold text-center sm:text-left break-words lg:text-2xl">
            {name}
          </h1>

          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                className={`h-3.5 w-3.5 fill-current lg:h-4 lg:w-4 ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-1 text-[11px] text-purple-700/80 lg:ml-2 lg:text-sm">
              ({rating} от {reviewCount} оценки)
            </span>
          </div>

          <div className="text-[11px] text-purple-700/80 text-center sm:text-left lg:text-sm">
            Разфасовка: {packaging}
          </div>
        </div>

        <div className="mt-2 flex w-[220px] max-w-full flex-col gap-1.5 self-center sm:mt-0 sm:self-start lg:w-[400px] lg:gap-3">
          <div className="text-[15px] font-semibold text-center sm:text-left lg:text-lg">
            {price}
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="app-icon-button h-7 w-7 text-sm font-medium lg:h-8 lg:w-8"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={event =>
                onQuantityChange(Math.max(1, parseInt(event.target.value) || 1))
              }
              className="w-14 rounded-lg border border-purple-200 px-2 py-1 text-center text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 lg:w-16"
              min="1"
            />
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="app-icon-button h-7 w-7 text-sm font-medium lg:h-8 lg:w-8"
            >
              +
            </button>
          </div>

          <button
            onClick={onAddToCart}
            className="app-button-primary self-center w-full max-w-[272px] py-2 text-[12px] shadow-md sm:self-start lg:max-w-none"
          >
            Добави в количката
          </button>
        </div>
      </div>
    </div>
  );
}
