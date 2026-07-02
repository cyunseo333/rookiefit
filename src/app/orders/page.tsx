"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function OrdersPage() {
  const { orders, user } = useStore();

  return (
    <>
      <div className="notice">로그인한 계정의 주문내역을 보여주는 페이지입니다.</div>
      <Header />
      <main className="page">
        <div className="title-row">
          <h1 className="page-title">My Orders</h1>
          <p className="section-desc">
            {user ? `${user.name}님 계정에 저장된 주문내역입니다.` : "주문내역은 로그인 후 확인할 수 있습니다."}
          </p>
        </div>

        {!user ? (
          <section className="panel">
            <strong>로그인이 필요합니다.</strong>
            <p className="muted">로그인하면 장바구니와 주문내역이 계정 기준으로 저장됩니다.</p>
            <Link className="button primary" href="/login">
              로그인하기
            </Link>
          </section>
        ) : orders.length === 0 ? (
          <section className="panel">
            <strong>아직 주문내역이 없습니다.</strong>
            <p className="muted">상품을 담고 실습용 결제를 완료하면 이곳에 저장됩니다.</p>
            <Link className="button primary" href="/">
              상품 보러가기
            </Link>
          </section>
        ) : (
          <div className="cart-list">
            {orders.map((order) => (
              <article className="order-card panel" key={order.id}>
                <div className="order-head" style={{ paddingBottom: 16, marginBottom: 16 }}>
                  <div>
                    <p className="product-title" style={{ fontSize: 18 }}>
                      {order.id}
                    </p>
                    <p className="muted">{new Date(order.orderedAt).toLocaleString("ko-KR")}</p>
                  </div>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
                <div className="cart-list">
                  {order.items.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="thumb">
                        <Image src={item.image} alt={item.name} fill sizes="96px" />
                      </div>
                      <div>
                        <p className="product-title">{item.name}</p>
                        <p className="muted">
                          {item.quantity}개 · {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
