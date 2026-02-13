"use client";

import { Review } from "@/data/reviews";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3 transition-all duration-300 hover:shadow-md">
      {/* 헤더: 작성자 + 날짜 */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800">{review.author}</span>
        <span className="text-xs text-gray-400">{review.date}</span>
      </div>

      {/* 별점 */}
      <StarRating rating={review.rating} size="sm" />

      {/* 리뷰 내용 */}
      {review.content && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {review.content}
        </p>
      )}

      {/* 주문 메뉴 */}
      <div className="pt-2 border-t border-gray-50">
        <p className="text-xs text-gray-400 truncate" title={review.menu}>
          {review.menu}
        </p>
      </div>
    </div>
  );
}
