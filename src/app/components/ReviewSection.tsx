"use client";

import { useState, useMemo } from "react";
import { reviews } from "@/data/reviews";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

type RatingFilter = "전체" | 5 | 4 | "3이하";

const REVIEWS_PER_PAGE = 6;

export default function ReviewSection() {
  const [filter, setFilter] = useState<RatingFilter>("전체");
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const filteredReviews = useMemo(() => {
    if (filter === "전체") return reviews;
    if (filter === "3이하") return reviews.filter((r) => r.rating <= 3);
    return reviews.filter((r) => r.rating === filter);
  }, [filter]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handleFilterChange = (newFilter: RatingFilter) => {
    setFilter(newFilter);
    setVisibleCount(REVIEWS_PER_PAGE);
  };

  const filters: { label: string; value: RatingFilter }[] = [
    { label: "전체", value: "전체" },
    { label: "5점", value: 5 },
    { label: "4점", value: 4 },
    { label: "3점 이하", value: "3이하" },
  ];

  return (
    <section className="space-y-6">
      {/* 섹션 헤더 */}
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-gray-800">
          쿠팡이츠 고객 리뷰
        </h2>
        <div className="flex items-center gap-3">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-lg font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-400">
            리뷰 {reviews.length}건
          </span>
        </div>
      </div>

      {/* 별점 필터 */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => handleFilterChange(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === f.value
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 리뷰 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* 리뷰 없음 */}
      {filteredReviews.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          해당 별점의 리뷰가 없습니다.
        </p>
      )}

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
            className="px-8 py-2.5 rounded-full border border-emerald-500 text-emerald-600 font-medium text-sm hover:bg-emerald-50 active:scale-[0.98] transition-all duration-200"
          >
            더보기 ({visibleCount}/{filteredReviews.length})
          </button>
        </div>
      )}
    </section>
  );
}
