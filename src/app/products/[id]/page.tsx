import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AddToCartButton } from "./product-actions";
import { findProduct, formatPrice } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="page">
          <h1 className="page-title">Product Not Found</h1>
          <p className="muted">상품을 찾을 수 없습니다.</p>
          <Link className="button primary" href="/">
            쇼핑 화면으로 돌아가기
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="notice">RookieFit 상품 상세 페이지</div>
      <Header />
      <main className="page">
        <div className="detail">
          <div className="detail-image">
            <Image src={product.image} alt={product.name} fill priority />
          </div>
          <section>
            <h1 className="page-title">{product.name}</h1>
            <div className="price" style={{ fontSize: 24, marginTop: 18 }}>
              {formatPrice(product.price)}
            </div>
            <div className="detail-list">
              <div className="detail-row">
                <div className="detail-label">1. 체형 추천</div>
                <div>
                  <span className="tag">{product.bodyType} 타입 추천</span>
                  <p className="muted">{product.reason}</p>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">2. 리뷰</div>
                <div className="muted">
                  리뷰 219개 · 핏이 편하고 상품 설명의 추천 체형이 이해하기
                  쉽다는 반응이 많아요.
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">3. 배송비</div>
                <div className="muted">기본 배송비 3,000원 · 70,000원 이상 무료배송</div>
              </div>
            </div>
            <AddToCartButton productId={product.id} />
          </section>
        </div>
      </main>
    </>
  );
}
