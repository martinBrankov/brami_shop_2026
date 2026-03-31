"use client";

import { Comment } from "@/data/productsData";

interface ProductReviewsProps {
  reviews: Comment[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">
          Добавете коментар
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Оценка
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
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
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Име
            </label>
            <input
              type="text"
              placeholder="Вашето име"
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Коментар
            </label>
            <textarea
              placeholder="Споделете мнението си за продукта..."
              rows={3}
              className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
            />
          </div>
          <button
            type="button"
            className="app-button-primary"
          >
            Изпрати коментар
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-sm text-purple-700/80">
            Все още няма коментари за този продукт. Бъдете първи, който ще сподели мнението си!
          </div>
        ) : (
          reviews.map((comment, index) => (
            <div key={index} className="border-l-2 border-purple-200 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
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
  );
}
