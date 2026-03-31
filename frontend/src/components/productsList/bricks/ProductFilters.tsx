"use client";

import { useState } from "react";
import {
  brandOptions,
  categoryOptions,
  ProductBrandFilter,
  ProductCategoryFilter,
} from "./useProductFilters";
import { useOrientation } from "@/hooks/useOrientation";

interface ProductFiltersProps {
  selectedCategories: ProductCategoryFilter[];
  selectedBrand: ProductBrandFilter[];
  onClearFilters: () => void;
  onCategoryToggle: (categoryId: "all" | ProductCategoryFilter) => void;
  onBrandToggle: (brandId: "all" | ProductBrandFilter) => void;
}

const getButtonClassName = (isActive: boolean, isAllOption = false) => {
  if (isAllOption) {
    return [
      "app-button",
      "justify-center",
      "min-w-[104px]",
      isActive
        ? "bg-red-500 text-white"
      : "bg-purple-200 text-purple-700 hover:bg-purple-300",
    ].join(" ");
  }

  return [
    "flex",
    "w-full",
    "items-center",
    "gap-3",
    "rounded-xl",
    "border",
    "px-3",
    "py-2.5",
    "text-left",
    "text-[13px]",
    "font-medium",
    "leading-tight",
    "transition-colors",
    isActive
      ? "border-purple-300 bg-purple-50 text-purple-900"
      : "border-purple-100 bg-white/80 text-purple-700 hover:border-purple-200 hover:bg-purple-50/80",
  ].join(" ");
};

export default function ProductFilters({
  selectedCategories,
  selectedBrand,
  onClearFilters,
  onCategoryToggle,
  onBrandToggle,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { orientation, isMobile } = useOrientation();
  const isPortraitMobile = isMobile && orientation === "portrait";

  return (
    <section className="mb-6 border-b border-purple-100 pb-6">
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
          className="app-button-soft min-w-[104px]"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Скрий филтрите" : "Покажи филтрите"}
        >
          {isExpanded ? "Скрий" : "Покажи"}
        </button>
      </div>

      <div
        className={`grid overflow-hidden ${
          isExpanded ? "mt-4 max-h-[1200px] opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-4 pb-1 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-purple-900/80">
              Категории
            </div>
            <div className="mb-3 flex justify-start">
              {categoryOptions
                .filter((category) => category.id === "all")
                .map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={getButtonClassName(selectedCategories.length === 0, true)}
                  >
                    {category.name}
                  </button>
                ))}
            </div>

            <div className={`${isPortraitMobile ? "space-y-2" : "space-y-2"}`}>
              {categoryOptions
                .filter((category) => category.id !== "all")
                .map((category) => {
                  const isActive = selectedCategories.includes(category.id);

                  return (
                    <button
                      key={category.id}
                      onClick={() => onCategoryToggle(category.id)}
                      className={getButtonClassName(isActive)}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          isActive
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-purple-200 bg-white text-transparent"
                        }`}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.414l-7.06 7.06a1 1 0 01-1.414 0l-3.535-3.535A1 1 0 016.11 8.815l2.828 2.828 6.353-6.353a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>{category.name}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[14px] font-semibold uppercase tracking-[0.16em] text-purple-900/80">
              Брандове
            </div>
            <div className="mb-3 flex justify-start">
              {brandOptions
                .filter((brand) => brand.id === "all")
                .map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => onBrandToggle(brand.id)}
                    className={getButtonClassName(selectedBrand.length === 0, true)}
                  >
                    {brand.name}
                  </button>
                ))}
            </div>

            <div className={`${isPortraitMobile ? "space-y-2" : "space-y-2"}`}>
              {brandOptions
                .filter((brand) => brand.id !== "all")
                .map((brand) => {
                  const isActive = selectedBrand.includes(brand.id);

                  return (
                    <button
                      key={brand.id}
                      onClick={() => onBrandToggle(brand.id)}
                      className={getButtonClassName(isActive)}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          isActive
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-purple-200 bg-white text-transparent"
                        }`}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.414l-7.06 7.06a1 1 0 01-1.414 0l-3.535-3.535A1 1 0 016.11 8.815l2.828 2.828 6.353-6.353a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>{brand.name}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClearFilters}
            className="app-button-neutral min-w-[104px]"
          >
            Изчисти
          </button>
        </div>
      </div>
    </section>
  );
}
