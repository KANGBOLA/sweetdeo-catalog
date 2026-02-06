export type Category = "스프레이" | "롤온" | "스틱" | "크림";

export type FreeFrom =
  | "무알코올"
  | "무파라벤"
  | "무향료"
  | "무알루미늄";

export const ALL_CATEGORIES: Category[] = ["스프레이", "롤온", "스틱", "크림"];
export const ALL_FREE_FROM: FreeFrom[] = [
  "무알코올",
  "무파라벤",
  "무향료",
  "무알루미늄",
];

export interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  freeFrom: FreeFrom[];
}

export const products: Product[] = [
  // 스프레이 (4)
  {
    id: 1,
    name: "프레시 브리즈 스프레이",
    category: "스프레이",
    description: "상쾌한 바람처럼 가벼운 미스트 타입 데오드란트",
    price: 12900,
    image: "/spray-1.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
  {
    id: 2,
    name: "쿨링 민트 스프레이",
    category: "스프레이",
    description: "천연 민트 추출물로 시원한 청량감을 선사합니다",
    price: 13900,
    image: "/spray-2.jpg",
    freeFrom: ["무파라벤", "무알루미늄"],
  },
  {
    id: 3,
    name: "센시티브 케어 스프레이",
    category: "스프레이",
    description: "민감한 피부를 위한 순한 저자극 스프레이",
    price: 15900,
    image: "/spray-3.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
  {
    id: 4,
    name: "스포츠 액티브 스프레이",
    category: "스프레이",
    description: "운동 후에도 강력한 지속력을 자랑하는 스프레이",
    price: 14900,
    image: "/spray-4.jpg",
    freeFrom: ["무파라벤", "무알루미늄"],
  },

  // 롤온 (4)
  {
    id: 5,
    name: "소프트 터치 롤온",
    category: "롤온",
    description: "부드러운 볼이 피부에 촉촉하게 밀착됩니다",
    price: 10900,
    image: "/rollon-1.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료"],
  },
  {
    id: 6,
    name: "데일리 프레시 롤온",
    category: "롤온",
    description: "매일 사용하기 좋은 가볍고 산뜻한 롤온",
    price: 9900,
    image: "/rollon-2.jpg",
    freeFrom: ["무파라벤", "무알루미늄"],
  },
  {
    id: 7,
    name: "내추럴 케어 롤온",
    category: "롤온",
    description: "천연 식물 성분으로 만든 자연 유래 롤온",
    price: 11900,
    image: "/rollon-3.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
  {
    id: 8,
    name: "롱래스팅 롤온",
    category: "롤온",
    description: "48시간 지속되는 강력한 데오드란트 효과",
    price: 12900,
    image: "/rollon-4.jpg",
    freeFrom: ["무파라벤"],
  },

  // 스틱 (4)
  {
    id: 9,
    name: "클린 코튼 스틱",
    category: "스틱",
    description: "깨끗한 면 향기의 고체형 데오드란트 스틱",
    price: 11900,
    image: "/stick-1.jpg",
    freeFrom: ["무알코올", "무파라벤", "무알루미늄"],
  },
  {
    id: 10,
    name: "파워 쉴드 스틱",
    category: "스틱",
    description: "강력한 땀 억제력의 프리미엄 스틱",
    price: 14900,
    image: "/stick-2.jpg",
    freeFrom: ["무파라벤", "무향료"],
  },
  {
    id: 11,
    name: "제로 스틱",
    category: "스틱",
    description: "무색 무취의 올프리 데오드란트 스틱",
    price: 13900,
    image: "/stick-3.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
  {
    id: 12,
    name: "우디 머스크 스틱",
    category: "스틱",
    description: "은은한 우디 머스크 향의 남성용 스틱",
    price: 12900,
    image: "/stick-4.jpg",
    freeFrom: ["무알코올", "무파라벤"],
  },

  // 크림 (4)
  {
    id: 13,
    name: "리치 모이스처 크림",
    category: "크림",
    description: "보습과 데오 기능을 동시에 잡은 크림 타입",
    price: 16900,
    image: "/cream-1.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
  {
    id: 14,
    name: "시어버터 크림",
    category: "크림",
    description: "시어버터가 풍부한 영양 데오드란트 크림",
    price: 17900,
    image: "/cream-2.jpg",
    freeFrom: ["무알코올", "무파라벤"],
  },
  {
    id: 15,
    name: "허벌 가든 크림",
    category: "크림",
    description: "라벤더와 캐모마일의 허브 블렌딩 크림",
    price: 15900,
    image: "/cream-3.jpg",
    freeFrom: ["무파라벤", "무알루미늄"],
  },
  {
    id: 16,
    name: "베이비 소프트 크림",
    category: "크림",
    description: "아기 피부처럼 순한 초저자극 데오드란트 크림",
    price: 18900,
    image: "/cream-4.jpg",
    freeFrom: ["무알코올", "무파라벤", "무향료", "무알루미늄"],
  },
];
