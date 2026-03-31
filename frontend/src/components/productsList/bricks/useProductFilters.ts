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
  const [selectedBrands, setSelectedBrands] = useState<ProductBrandFilter[]>([]);

  const toggleCategory = (categoryId: "all" | ProductCategoryFilter) => {
    if (categoryId === "all") {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const toggleBrand = (brandId: "all" | ProductBrandFilter) => {
    if (brandId === "all") {
      setSelectedBrands([]);
      return;
    }

    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some(selectedCategory =>
          product.category.includes(selectedCategory),
        );

      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand as ProductBrandFilter);

      return categoryMatch && brandMatch;
    });
  }, [allProducts, selectedBrands, selectedCategories]);

  return {
    filteredProducts,
    selectedBrand: selectedBrands,
    selectedCategories,
    clearFilters,
    toggleBrand,
    toggleCategory,
  };
}

