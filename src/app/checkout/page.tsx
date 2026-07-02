"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { TossPaymentWidget } from "@/components/payments/TossPaymentWidget";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, user } = useStore();
  const [message, setMessage] = useState("");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 70000 ? 0 : 3000;
  const discount = 0;
  const total = subtotal + shipping - discount;
  const orderName = cart.length > 1 ? `${cart[0].name} 외 ${cart.length - 1}건` : cart[0]?.name || "RookieFit 주문";

  return (
    <>
      <div className="notice">RookieFit Checkout · 주문 정보를 확인하고 결제를 진행하세요.</div>
      <Header />
      <main className="page checkout-page">
        <div className="title-row">
          <h1 className="page-title">Checkout</h1>
          <p className="section-desc">배송지, 결제수단, 주문 상품을 확인한 뒤 결제하기를 눌러주세요.</p>
        </div>

        <div className="checkout-layout">
          <section className="checkout-main">
            <div className="panel checkout-section">
              <div className="checkout-section-head">
                <h2>주문자 정보</h2>
                <span>01</span>
              </div>
              <div className="form-grid two">
                <div className="field">
                  <label htmlFor="buyerName">이름</label>
                  <input id="buyerName" defaultValue={user?.name || "김서연"} />
                </div>
                <div className="field">
                  <label htmlFor="buyerPhone">연락처</label>
                  <input id="buyerPhone" defaultValue="010-1234-5678" />
                </div>
                <div className="field wide">
                  <label htmlFor="buyerEmail">이메일</label>
                  <input id="buyerEmail" type="email" defaultValue={user?.email || "rookie@example.com"} />
                </div>
              </div>
            </div>

            <div className="panel checkout-section">
              <div className="checkout-section-head">
                <h2>배송지</h2>
                <span>02</span>
              </div>
              <div className="form-grid two">
                <div className="field wide">
                  <label htmlFor="address">주소</label>
                  <input id="address" defaultValue="서울특별시 성동구 성수동 123" />
                </div>
                <div className="field">
                  <label htmlFor="detailAddress">상세 주소</label>
                  <input id="detailAddress" defaultValue="RookieFit 빌딩 5층" />
                </div>
                <div className="field">
                  <label htmlFor="postalCode">우편번호</label>
                  <input id="postalCode" defaultValue="04781" />
                </div>
                <div className="field wide">
                  <label htmlFor="deliveryMemo">배송 요청사항</label>
                  <select id="deliveryMemo" defaultValue="문 앞에 놓아주세요">
                    <option>문 앞에 놓아주세요</option>
                    <option>배송 전 연락주세요</option>
                    <option>경비실에 맡겨주세요</option>
                    <option>직접 입력</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="panel checkout-section">
              <div className="checkout-section-head">
                <h2>할인 / 쿠폰</h2>
                <span>03</span>
              </div>
              <div className="coupon-row">
                <input aria-label="쿠폰 코드" placeholder="쿠폰 코드를 입력하세요" />
                <button className="button secondary" type="button">적용</button>
              </div>
              <p className="muted">100,000원 이상 구매 시 자동으로 5,000원 할인이 적용됩니다.</p>
            </div>

            <div className="panel checkout-section">
              <div className="checkout-section-head">
                <h2>결제</h2>
                <span>04</span>
              </div>
              <TossPaymentWidget
                amount={total}
                customerEmail={user?.email}
                customerName={user?.name || "RookieFit 고객"}
                disabled={cart.length === 0}
                orderName={orderName}
                onMessage={setMessage}
              />
              {message ? <div className="status">{message}</div> : null}
            </div>
          </section>

          <aside className="panel checkout-summary">
            <h2>주문 상품</h2>
            <div className="cart-list">
              {cart.length === 0 ? (
                <p className="muted">장바구니가 비어 있습니다.</p>
              ) : (
                cart.map((item) => (
                  <article className="checkout-item" key={item.id}>
                    <div className="thumb">
                      <Image src={item.image} alt={item.name} fill sizes="84px" />
                    </div>
                    <div>
                      <p className="product-title">{item.name}</p>
                      <p className="muted">수량 {item.quantity}개 · {item.bodyType} 추천</p>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </article>
                ))
              )}
            </div>
            <div className="summary-line">
              <span>상품 금액</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>배송비</span>
              <span>{shipping === 0 ? "무료배송" : formatPrice(shipping)}</span>
            </div>
            <div className="summary-line">
              <span>할인</span>
              <span>{discount ? `- ${formatPrice(discount)}` : "KRW 0"}</span>
            </div>
            <div className="summary-line total">
              <span>총 결제 금액</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link className="button secondary checkout-button" href="/cart">
              장바구니로 돌아가기
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
