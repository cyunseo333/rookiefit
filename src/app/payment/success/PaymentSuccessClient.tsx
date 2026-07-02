"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

type ConfirmState =
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const { createOrder } = useStore();
  const [state, setState] = useState<ConfirmState>({
    status: "loading",
    message: "결제 승인 중입니다.",
  });

  useEffect(() => {
    let cancelled = false;

    async function confirmPayment() {
      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = Number(searchParams.get("amount"));

      if (!paymentKey || !orderId || !amount) {
        setState({
          status: "error",
          message: "결제 승인에 필요한 정보가 없습니다.",
        });
        return;
      }

      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });
        const result = await response.json();

        if (cancelled) return;

        if (!response.ok || !result.ok) {
          setState({
            status: "error",
            message: result.message || "결제 승인에 실패했습니다.",
          });
          return;
        }

        const order = createOrder();
        setState({
          status: "success",
          message: order
            ? `${order.id} 주문이 저장되었습니다.`
            : "결제는 승인되었지만 로컬 주문 저장 대상이 없습니다.",
        });
      } catch {
        if (!cancelled) {
          setState({
            status: "error",
            message: "결제 승인 요청 중 오류가 발생했습니다.",
          });
        }
      }
    }

    confirmPayment();

    return () => {
      cancelled = true;
    };
  }, [createOrder, searchParams]);

  return (
    <main className="payment-result">
      <div className={`result-mark ${state.status}`}>{state.status === "success" ? "✓" : "!"}</div>
      <h1>{state.status === "success" ? "Payment Complete" : "Payment Check"}</h1>
      <p>{state.message}</p>
      <div className="actions">
        <Link className="button primary" href="/orders">
          주문내역 보기
        </Link>
        <Link className="button secondary" href="/">
          쇼핑 계속하기
        </Link>
      </div>
    </main>
  );
}
