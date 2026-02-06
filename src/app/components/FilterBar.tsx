"use client";

import { Category, FreeFrom, ALL_CATEGORIES, ALL_FREE_FROM } from "@/data/products";

interface FilterBarProps {
  selectedCategory: Category | "전체";
  activeFreeFrom: FreeFrom[];
  onCategoryChange: (cat: Category | "전체") => void;
  onFreeFromToggle: (ff: FreeFrom) => void;
}

export default function FilterBar({
  selectedCategory,
  activeFreeFrom,
  onCategoryChange,
  onFreeFromToggle,
}: FilterBarProps) {
  const categories: (Category | "전체")[] = ["전체", ...ALL_CATEGORIES];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 space-y-4">
      {/* 카테고리 필터 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4FREE 필터 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">4FREE 필터</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_FREE_FROM.map((ff) => {
            const isActive = activeFreeFrom.includes(ff);
            return (
              <button
                key={ff}
                onClick={() => onFreeFromToggle(ff)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {isActive && (
                  <span className="mr-1">&#10003;</span>
                )}
                {ff}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
