"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function PaymentFailClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "PAYMENT_FAILED";
  const message = searchParams.get("message") || "결제가 완료되지 않았습니다.";

  return (
    <main className="payment-result">
      <div className="result-mark error">!</div>
      <h1>Payment Failed</h1>
      <p>{message}</p>
      <div className="status">오류 코드: {code}</div>
      <div className="actions">
        <Link className="button primary" href="/checkout">
          결제 다시 하기
        </Link>
        <Link className="button secondary" href="/cart">
          장바구니 보기
        </Link>
      </div>
    </main>
  );
}
