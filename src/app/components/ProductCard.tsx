import { Product } from "@/data/products";
import { clientEnv } from "@/config/env";

const categoryColors: Record<string, string> = {
  스프레이: "bg-blue-100 text-blue-700",
  롤온: "bg-purple-100 text-purple-700",
  스틱: "bg-orange-100 text-orange-700",
  크림: "bg-pink-100 text-pink-700",
};

const categoryIcons: Record<string, string> = {
  스프레이: "💨",
  롤온: "🔵",
  스틱: "📏",
  크림: "🧴",
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* 이미지 플레이스홀더 */}
      <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center overflow-hidden">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {categoryIcons[product.category]}
        </span>
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category]}`}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* 제품 정보 */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {product.description}
        </p>

        {/* 4FREE 뱃지 */}
        <div className="flex flex-wrap gap-1.5">
          {product.freeFrom.map((ff) => (
            <span
              key={ff}
              className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-xs font-medium"
            >
              {ff}
            </span>
          ))}
        </div>

        {/* 가격 */}
        <div className="pt-2 border-t border-gray-50">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toLocaleString("ko-KR")}
          </span>
          <span className="text-sm text-gray-400 ml-0.5">
            {clientEnv.currency === "KRW" ? "원" : clientEnv.currency}
          </span>
        </div>
      </div>
    </div>
  );
}
