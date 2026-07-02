export type BodyType = "스트레이트" | "웨이브" | "내추럴" | "공통";

export type Product = {
  id: string;
  name: string;
  category: "tops" | "bottoms" | "outerwear" | "accessories";
  categoryLabel: string;
  price: number;
  tag: string;
  bodyType: BodyType;
  reason: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "clean-collar-half-knit",
    name: "Clean collar half knit",
    category: "tops",
    categoryLabel: "상의",
    price: 62000,
    tag: "스트레이트 타입 추천",
    bodyType: "스트레이트",
    reason: "단정한 카라와 힘 있는 짜임이 깔끔한 인상을 줘요.",
    description: "카라가 있는 반팔 니트형 상의입니다. 단정한 데일리룩에 잘 어울립니다.",
    image: "/products/옷8.png",
  },
  {
    id: "straight-clean-slacks",
    name: "Straight clean slacks",
    category: "bottoms",
    categoryLabel: "하의",
    price: 54000,
    tag: "스트레이트 타입 추천",
    bodyType: "스트레이트",
    reason: "일자로 떨어지는 라인이 전체 실루엣을 깔끔하게 잡아줘요.",
    description: "곧게 떨어지는 슬랙스로 셔츠나 니트와 함께 입으면 정돈되어 보입니다.",
    image: "/products/옷3.png",
  },
  {
    id: "light-summer-blazer",
    name: "Light summer blazer",
    category: "outerwear",
    categoryLabel: "아우터",
    price: 89000,
    tag: "스트레이트 타입 추천",
    bodyType: "스트레이트",
    reason: "가벼운 어깨선과 단정한 구조가 신뢰감 있는 인상을 만들어요.",
    description: "여름에도 가볍게 걸칠 수 있는 구조감 있는 블레이저입니다.",
    image: "/products/옷9.png",
  },
  {
    id: "structured-shirt-dress",
    name: "Structured shirt dress",
    category: "tops",
    categoryLabel: "상의",
    price: 76000,
    tag: "스트레이트 타입 추천",
    bodyType: "스트레이트",
    reason: "정돈된 셔츠 라인이 깔끔하고 세련된 분위기를 만들어줘요.",
    description: "셔츠 디테일이 들어간 원피스형 상품입니다.",
    image: "/products/옷10.png",
  },
  {
    id: "classic-sheer-summer-shirt",
    name: "Classic sheer summer shirt",
    category: "tops",
    categoryLabel: "상의",
    price: 43500,
    tag: "웨이브 타입 추천",
    bodyType: "웨이브",
    reason: "부드러운 소재와 가벼운 비침이 자연스러운 분위기를 만들어줘요.",
    description: "가볍고 시어한 느낌의 여름 셔츠입니다.",
    image: "/products/옷10.png",
  },
  {
    id: "soft-pink-midi-skirt",
    name: "Soft pink midi skirt",
    category: "bottoms",
    categoryLabel: "하의",
    price: 49000,
    tag: "웨이브 타입 추천",
    bodyType: "웨이브",
    reason: "미디 기장과 부드러운 색감이 로맨틱하지만 과하지 않아요.",
    description: "셔츠나 가디건과 함께 입기 좋은 미디 스커트입니다.",
    image: "/products/옷9.png",
  },
  {
    id: "short-soft-cardigan",
    name: "Short soft cardigan",
    category: "outerwear",
    categoryLabel: "아우터",
    price: 36800,
    tag: "웨이브 타입 추천",
    bodyType: "웨이브",
    reason: "짧은 기장과 부드러운 짜임이 허리선을 자연스럽게 보여줘요.",
    description: "짧은 기장의 가벼운 가디건입니다.",
    image: "/products/옷7.png",
  },
  {
    id: "ribbon-waist-one-piece",
    name: "Ribbon waist one-piece",
    category: "tops",
    categoryLabel: "상의",
    price: 69000,
    tag: "웨이브 타입 추천",
    bodyType: "웨이브",
    reason: "허리선이 살짝 잡혀 부드러운 실루엣을 만들어줘요.",
    description: "허리 리본으로 실루엣을 조절할 수 있는 원피스입니다.",
    image: "/products/옷6.png",
  },
  {
    id: "natural-linen-half-shirt",
    name: "Natural linen half shirt",
    category: "tops",
    categoryLabel: "상의",
    price: 37000,
    tag: "내추럴 타입 추천",
    bodyType: "내추럴",
    reason: "가벼운 린넨 질감과 여유 있는 핏이 편안하게 어울려요.",
    description: "여유 있는 핏의 린넨 느낌 반팔 셔츠입니다.",
    image: "/products/옷11.png",
  },
  {
    id: "linen-wide-easy-pants",
    name: "Linen wide easy pants",
    category: "bottoms",
    categoryLabel: "하의",
    price: 58000,
    tag: "내추럴 타입 추천",
    bodyType: "내추럴",
    reason: "여유 있는 핏과 린넨 질감이 편안하고 세련된 느낌을 줘요.",
    description: "루즈핏 상의와 함께 입기 좋은 와이드 이지 팬츠입니다.",
    image: "/products/옷5.png",
  },
  {
    id: "sheer-wind-jumper",
    name: "Sheer wind jumper",
    category: "outerwear",
    categoryLabel: "아우터",
    price: 73800,
    tag: "내추럴 타입 추천",
    bodyType: "내추럴",
    reason: "얇고 여유 있는 아우터가 자연스러운 레이어드를 만들어줘요.",
    description: "여름철 실내외 온도차에 가볍게 걸치기 좋은 점퍼입니다.",
    image: "/products/옷12.png",
  },
  {
    id: "loose-stripe-sleeveless",
    name: "Loose stripe sleeveless",
    category: "tops",
    categoryLabel: "상의",
    price: 66100,
    tag: "내추럴 타입 추천",
    bodyType: "내추럴",
    reason: "여유 있는 실루엣과 세로 결이 자연스러운 분위기를 살려줘요.",
    description: "와이드 팬츠나 롱스커트와 잘 어울리는 민소매 상의입니다.",
    image: "/products/옷4.png",
  },
  {
    id: "lace-layered-eco-bag",
    name: "Lace layered eco bag",
    category: "accessories",
    categoryLabel: "악세서리",
    price: 43500,
    tag: "로맨틱 포인트",
    bodyType: "공통",
    reason: "시어한 레이스 질감이 기본 코디에 부드러운 포인트를 더해줘요.",
    description: "심플한 룩에 부드러운 포인트를 더하는 에코백입니다.",
    image: "/products/가방1.png",
  },
  {
    id: "minimal-slim-necklace",
    name: "Minimal slim necklace",
    category: "accessories",
    categoryLabel: "악세서리",
    price: 21000,
    tag: "데일리 추천",
    bodyType: "공통",
    reason: "얇은 라인의 악세서리가 과하지 않게 전체 룩을 정돈해줘요.",
    description: "어떤 체형이나 스타일에도 부담 없이 매치하기 좋은 목걸이입니다.",
    image: "/products/목걸이1.png",
  },
  {
    id: "soft-ribbon-hair-clip",
    name: "Soft ribbon hair clip",
    category: "accessories",
    categoryLabel: "악세서리",
    price: 16000,
    tag: "웨이브 무드 추천",
    bodyType: "웨이브",
    reason: "작은 리본 디테일이 로맨틱한 분위기를 가볍게 더해줘요.",
    description: "부드러운 리본 디테일의 헤어 클립입니다.",
    image: "/products/헤어클립1.png",
  },
];

export const bodyTypes: BodyType[] = ["스트레이트", "웨이브", "내추럴"];

export function formatPrice(price: number) {
  return `KRW ${new Intl.NumberFormat("ko-KR").format(price)}`;
}

export function findProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function productsByBodyType(bodyType: BodyType) {
  return products.filter((product) => product.bodyType === bodyType).slice(0, 4);
}

export function productsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category).slice(0, 3);
}
