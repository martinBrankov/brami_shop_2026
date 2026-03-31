"use client";

import { useMemo, useState } from "react";
import { Product, products } from "@/data/productsData";

export type ProductCategoryFilter = "hair" | "body" | "face";
export type ProductBrandFilter = "brami" | "vodica" | "other";

export const categoryOptions = [
  { id: "all" as const, name: "Всички" },
  { id: "hair" as const, name: "Коса" },
  { id: "body" as const, name: "Тяло" },
  { id: "face" as const, name: "Лице" },
];

export const brandOptions = [
  { id: "all" as const, name: "Всички" },
  { id: "brami" as const, name: "Brami" },
  { id: "vodica" as const, name: "Vodica" },
  { id: "other" as const, name: "Други" },
];

export function useProductFilters(allProducts: Product[] = products) {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategoryFilter[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<ProductBrandFilter | null>(null);

  const toggleCategory = (categoryId: "all" | ProductCategoryFilter) => {
    if (categoryId === "all") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories(prev =>
      prev[0] === categoryId ? [] : [categoryId],
    );
  };

  const toggleBrand = (brandId: "all" | ProductBrandFilter) => {
    setSelectedBrand(brandId === "all" ? null : brandId);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some(selectedCategory =>
          product.category.includes(selectedCategory),
        );

      const brandMatch = selectedBrand === null || product.brand === selectedBrand;

      return categoryMatch && brandMatch;
    });
  }, [allProducts, selectedBrand, selectedCategories]);

  return {
    filteredProducts,
    selectedBrand,
    selectedCategories,
    toggleBrand,
    toggleCategory,
  };
}

