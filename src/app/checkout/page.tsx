"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, user, createOrder } = useStore();
  const [message, setMessage] = useState("");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 70000 ? 0 : 3000;

  function completeOrder() {
    if (!user) {
      setMessage("주문내역 저장을 위해 먼저 로그인해주세요.");
      return;
    }
    const order = createOrder();
    setMessage(order ? `${order.id} 주문이 저장되었습니다.` : "장바구니가 비어 있습니다.");
  }

  return (
    <>
      <div className="notice">실습용 결제 화면입니다. 실제 결제는 진행되지 않습니다.</div>
      <Header />
      <main className="page">
        <div className="title-row">
          <h1 className="page-title">Checkout</h1>
          <p className="section-desc">
            로그인 상태에서 결제 완료를 누르면 주문내역이 저장됩니다.
          </p>
        </div>
        <div className="layout">
          <section className="panel">
            <h2>배송지</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">이름</label>
                <input id="name" defaultValue={user?.name || "김서연"} />
              </div>
              <div className="field">
                <label htmlFor="phone">연락처</label>
                <input id="phone" defaultValue="010-1234-5678" />
              </div>
              <div className="field">
                <label htmlFor="address">주소</label>
                <input id="address" defaultValue="서울특별시 성동구 성수동 123" />
              </div>
            </div>
          </section>
          <aside className="panel">
            <h2>주문 상품</h2>
            <div className="cart-list">
              {cart.length === 0 ? (
                <p className="muted">장바구니가 비어 있습니다.</p>
              ) : (
                cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div className="thumb">
                      <Image src={item.image} alt={item.name} fill sizes="96px" />
                    </div>
                    <div>
                      <p className="product-title">{item.name}</p>
                      <p className="muted">수량 {item.quantity}개</p>
                    </div>
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
            <div className="summary-line total">
              <span>총 결제 금액</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
            <button className="button primary" type="button" onClick={completeOrder} style={{ width: "100%", marginTop: 18 }}>
              실습용 결제 완료하기
            </button>
            {message ? <div className="status">{message}</div> : null}
            <Link className="button secondary" href="/orders" style={{ width: "100%", marginTop: 12 }}>
              주문내역 보기
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}
