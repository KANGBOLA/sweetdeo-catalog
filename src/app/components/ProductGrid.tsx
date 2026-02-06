import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          조건에 맞는 제품이 없습니다
        </h3>
        <p className="text-gray-400">
          필터 조건을 변경해 보세요
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">
        총 <span className="font-semibold text-gray-600">{products.length}</span>개 제품
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
