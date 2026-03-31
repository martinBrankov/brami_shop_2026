"use client";

import { useState } from "react";
import { Comment, Product } from "@/data/productsData";
import { useCart } from "@/contexts/CartContext";
import ProductDescription from "./bricks/ProductDescription";
import ProductHero from "./bricks/ProductHero";
import ProductReviews from "./bricks/ProductReviews";

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
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <section className="page-shell">
      <div className="surface-card-tight">
        <div className="flex flex-col gap-5">
          <ProductHero
            imageSrc={imageSrc}
            name={name}
            packaging={packaging}
            price={price}
            quantity={quantity}
            rating={rating}
            reviewCount={review.length}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
          />

          <div className="w-full">
            <div className="mb-4 flex border-b border-purple-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "text-purple-900 border-purple-900"
                    : "text-purple-600 border-transparent hover:text-purple-800"
                }`}
              >
                Описание
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "reviews"
                    ? "text-purple-900 border-purple-900"
                    : "text-purple-600 border-transparent hover:text-purple-800"
                }`}
              >
                Коментари ({review.length})
              </button>
            </div>

            <div className="text-purple-900">
              {activeTab === "description" && (
                <ProductDescription description={description} />
              )}
              {activeTab === "reviews" && <ProductReviews reviews={review} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
