"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import {
  bodyTypes,
  productsByBodyType,
  productsByCategory,
  type BodyType,
  type Product,
} from "@/lib/products";

const categories: { key: Product["category"]; label: string }[] = [
  { key: "tops", label: "상의" },
  { key: "bottoms", label: "하의" },
  { key: "outerwear", label: "아우터" },
  { key: "accessories", label: "악세서리" },
];

export default function Home() {
  const [bodyType, setBodyType] = useState<BodyType>("스트레이트");
  const [category, setCategory] = useState<Product["category"]>("tops");

  return (
    <>
      <div className="notice">나에게 어울리는 스타일을 1분 안에 찾아보세요.</div>
      <Header />
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">SOFT SEOUL EDITORIAL</div>
            <h1 className="hero-title">
              Find your
              <br />
              fit mood.
            </h1>
            <p className="hero-copy">
              체형을 평가하지 않고, 스트레이트·웨이브·내추럴 특징을 바탕으로
              나에게 자연스럽게 어울리는 K패션 스타일을 추천합니다.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#body-type">
                체형 추천 보기
              </a>
              <a className="button secondary" href="#shop">
                카테고리 상품 보기
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-label="브랜드 비주얼">
            <div className="visual-card">
              <Image src="/products/옷10.png" alt="Clean shirt" fill priority />
              <div className="visual-label">Clean shirt · Soft silhouette</div>
            </div>
            <div className="visual-card tall">
              <Image src="/products/옷7.png" alt="Soft layer" fill />
              <div className="visual-label">Sheer layer · Seoul mood</div>
            </div>
          </div>
        </section>

        <section className="section" id="body-type">
          <div className="section-head">
            <h2>Body Type Finder</h2>
            <p className="section-desc">
              진단은 테스트가 아니라 스타일을 찾는 과정입니다. 가장 가까운
              체형을 선택하면 추천 상품이 바뀝니다.
            </p>
          </div>
          <div className="quiz-panel">
            <div className="result-card">
              <strong>{bodyType} 타입 추천 상품</strong>
              <p className="muted">
                선택한 체형에 잘 어울리는 소재, 실루엣, 기장감을 기준으로
                상품을 보여줍니다.
              </p>
              <div className="tags">
                <span className="tag">체형 친화 추천</span>
                <span className="tag">K패션 무드</span>
              </div>
            </div>
            <div className="quiz-options">
              {bodyTypes.map((type) => (
                <button
                  className={`option ${type === bodyType ? "active" : ""}`}
                  key={type}
                  type="button"
                  onClick={() => setBodyType(type)}
                >
                  <b>{type}</b>
                  <span>
                    {type === "스트레이트"
                      ? "깔끔한 라인과 힘 있는 소재가 잘 어울릴 수 있어요."
                      : type === "웨이브"
                        ? "부드러운 소재와 살짝 잡힌 허리선이 잘 맞을 수 있어요."
                        : "여유 있는 실루엣이 자연스러운 분위기를 살려줘요."}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="product-grid" style={{ marginTop: 18 }}>
            {productsByBodyType(bodyType).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section" id="shop">
          <div className="section-head">
            <h2>Shop Category</h2>
            <p className="section-desc">
              일반 쇼핑몰처럼 카테고리별 상품을 볼 수 있고, 각 상품에는 체형
              추천 이유를 함께 보여줍니다.
            </p>
          </div>
          <div className="category-tabs">
            {categories.map((item) => (
              <button
                className={`category-tab ${item.key === category ? "active" : ""}`}
                key={item.key}
                type="button"
                onClick={() => setCategory(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="product-grid" style={{ marginTop: 22 }}>
            {productsByCategory(category).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Backend Ready</h2>
            <p className="section-desc">
              현재 화면은 Next.js로 이전되었고, Supabase 연결 파일과 DB 스키마를
              준비했습니다.
            </p>
          </div>
          <div className="result-card">
            <strong>다음 연결 단계</strong>
            <p className="muted">
              Supabase 프로젝트를 만든 뒤 환경변수만 넣으면 Auth, 상품 DB,
              장바구니, 주문내역을 서버 저장 방식으로 바꿀 수 있습니다.
            </p>
            <div className="actions">
              <Link className="button primary" href="/login">
                로그인 화면 보기
              </Link>
              <Link className="button secondary" href="/cart">
                장바구니 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        RookieFit · Next.js · Supabase Ready · Vercel Deploy
      </footer>
    </>
  );
}
