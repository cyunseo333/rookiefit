"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 70000 ? 0 : 3000;

  return (
    <>
      <div className="notice">장바구니는 로그인 사용자 기준으로 저장됩니다.</div>
      <Header />
      <main className="page">
        <h1 className="page-title">Shopping Bag</h1>
        <div className="layout" style={{ marginTop: 28 }}>
          <section className="panel">
            {cart.length === 0 ? (
              <div className="status">담긴 상품이 없습니다. RookieFit에서 추천 상품을 담아보세요.</div>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div className="thumb">
                      <Image src={item.image} alt={item.name} fill sizes="96px" />
                    </div>
                    <div>
                      <p className="product-title">{item.name}</p>
                      <p className="muted">
                        {item.bodyType} 타입 추천 · {formatPrice(item.price)}
                      </p>
                      <p className="reason">{item.reason}</p>
                    </div>
                    <div className="header-actions">
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button className="text-button" type="button" onClick={() => removeFromCart(item.id)}>
                        삭제
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          <aside className="panel">
            <h2>주문 요약</h2>
            <div className="summary-line">
              <span>상품 금액</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>배송비</span>
              <span>{shipping === 0 ? "무료배송" : formatPrice(shipping)}</span>
            </div>
            <div className="summary-line total">
              <span>총 결제 금액</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
            <Link className="button primary" href="/checkout" style={{ width: "100%", marginTop: 18 }}>
              결제하기
            </Link>
            <Link className="button secondary" href="/" style={{ width: "100%", marginTop: 12 }}>
              상품 더 보기
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
