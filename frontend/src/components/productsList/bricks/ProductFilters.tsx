"use client";

import { useState } from "react";
import {
  brandOptions,
  categoryOptions,
  ProductBrandFilter,
  ProductCategoryFilter,
} from "./useProductFilters";

interface ProductFiltersProps {
  selectedCategories: ProductCategoryFilter[];
  selectedBrand: ProductBrandFilter | null;
  onCategoryToggle: (categoryId: "all" | ProductCategoryFilter) => void;
  onBrandToggle: (brandId: "all" | ProductBrandFilter) => void;
}

const getButtonClassName = (isActive: boolean) => {
  return [
    "app-button",
    isActive
      ? "bg-red-500 text-white"
      : "bg-purple-200 text-purple-700 hover:bg-purple-300",
  ].join(" ");
};

export default function ProductFilters({
  selectedCategories,
  selectedBrand,
  onCategoryToggle,
  onBrandToggle,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="surface-card-tight mb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-purple-900/80">
            Филтри
          </h2>
          <p className="mt-1 text-xs text-purple-700/70">
            {isExpanded
              ? "Изберете категория и бранд, за да стесните резултатите."
              : "Натиснете, за да покажете филтрите."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="app-button-soft w-[104px]"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Скрий филтрите" : "Покажи филтрите"}
        >
          {isExpanded ? "Скрий" : "Покажи"}
        </button>
      </div>

      <div
        className={`grid overflow-hidden ${
          isExpanded ? "mt-4 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-4 pb-1 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-purple-900/80">
              Категории
            </div>
            <div className="flex flex-wrap justify-start gap-2">
              {categoryOptions.map((category) => {
                const isActive =
                  category.id === "all"
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(category.id);

                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={getButtonClassName(isActive)}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-purple-900/80">
              Брандове
            </div>
            <div className="flex flex-wrap justify-start gap-2">
              {brandOptions.map((brand) => {
                const isActive =
                  brand.id === "all" ? selectedBrand === null : selectedBrand === brand.id;

                return (
                  <button
                    key={brand.id}
                    onClick={() => onBrandToggle(brand.id)}
                    className={getButtonClassName(isActive)}
                  >
                    {brand.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
