"use client";

import { useState, useMemo } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import { products, Category, FreeFrom } from "@/data/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "전체">("전체");
  const [activeFreeFrom, setActiveFreeFrom] = useState<FreeFrom[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 카테고리 필터
      if (selectedCategory !== "전체" && product.category !== selectedCategory) {
        return false;
      }
      // 4FREE 필터 (AND 조건)
      if (activeFreeFrom.length > 0) {
        return activeFreeFrom.every((ff) => product.freeFrom.includes(ff));
      }
      return true;
    });
  }, [selectedCategory, activeFreeFrom]);

  const handleFreeFromToggle = (ff: FreeFrom) => {
    setActiveFreeFrom((prev) =>
      prev.includes(ff) ? prev.filter((item) => item !== ff) : [...prev, ff]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <FilterBar
          selectedCategory={selectedCategory}
          activeFreeFrom={activeFreeFrom}
          onCategoryChange={setSelectedCategory}
          onFreeFromToggle={handleFreeFromToggle}
        />
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
