import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AddToCartButton } from "./product-actions";
import { findProduct, formatPrice, getProductDetails } from "@/lib/products";

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

  const details = getProductDetails(product);

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
            <p className="muted" style={{ marginTop: 16 }}>{product.description}</p>
            <div className="product-meta-lines">
              <div>
                <span>BODY TYPE</span>
                <strong>{product.bodyType}</strong>
              </div>
              <div>
                <span>DELIVERY</span>
                <strong>3,000원 / 70,000원 이상 무료</strong>
              </div>
            </div>
            <AddToCartButton productId={product.id} sizes={details.sizes} />
          </section>
        </div>

        <section className="product-detail-sections">
          <div className="info-section">
            <h2>PRODUCT INFO</h2>
            <p>{details.detailDescription}</p>
          </div>

          <div className="info-section">
            <h2>BODY TYPE GUIDE</h2>
            <div className="guide-card">
              <span className="tag">{product.bodyType} 타입 추천</span>
              <p>{product.reason}</p>
            </div>
          </div>

          <div className="info-section">
            <h2>SIZE</h2>
            <div className="size-table product-size-table">
              <div>SIZE</div>
              <div>LENGTH</div>
              <div>SHOULDER</div>
              <div>CHEST</div>
              <div>S</div>
              <div>58</div>
              <div>39</div>
              <div>45</div>
              <div>M</div>
              <div>60</div>
              <div>40.5</div>
              <div>47</div>
              <div>L</div>
              <div>62</div>
              <div>42</div>
              <div>49</div>
            </div>
            <p className="muted">{details.sizeGuide}</p>
          </div>

          <div className="info-section">
            <h2>FABRIC & CARE</h2>
            <div className="info-grid">
              <div>
                <strong>FABRIC</strong>
                <p>{details.fabric}</p>
              </div>
              <div>
                <strong>CARE</strong>
                <p>{details.care}</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>SHIPPING</h2>
            <p>기본 배송비는 3,000원이며, 70,000원 이상 구매 시 무료배송으로 적용됩니다.</p>
            <p className="muted">평균 출고일은 결제 완료 후 1-3영업일입니다.</p>
          </div>

          <div className="info-section reviews-section">
            <h2>REVIEW</h2>
            <div className="review-list">
              <article className="review-item">
                <strong>김서연 · 웨이브</strong>
                <p>추천 이유가 상세해서 고르기 쉬웠고, 실제 핏도 설명과 비슷했어요.</p>
              </article>
              <article className="review-item">
                <strong>정유진 · 스트레이트</strong>
                <p>상품 상세에 사이즈 표가 있어 선택하기 편했습니다.</p>
              </article>
              <article className="review-item">
                <strong>김서윤 · 내추럴</strong>
                <p>소재와 세탁 안내가 아래에 정리되어 있어서 구매 전에 확인하기 좋았어요.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
