"use client";

import { ANONYMOUS, loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useEffect, useMemo, useRef, useState } from "react";

type TossPaymentWidgetProps = {
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail?: string;
  disabled?: boolean;
  onMessage: (message: string) => void;
};

export function TossPaymentWidget({
  amount,
  orderName,
  customerName,
  customerEmail,
  disabled = false,
  onMessage,
}: TossPaymentWidgetProps) {
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const customerKey = useMemo(() => {
    if (!customerEmail) return ANONYMOUS;
    return `rookiefit_${customerEmail.replace(/[^a-zA-Z0-9@._=-]/g, "_")}`.slice(0, 50);
  }, [customerEmail]);

  useEffect(() => {
    let cancelled = false;

    async function renderWidget() {
      if (!clientKey) {
        setReady(false);
        return;
      }

      try {
        const tossPayments = await loadTossPayments(clientKey);
        if (cancelled) return;

        const widgets = tossPayments.widgets({ customerKey });
        widgetsRef.current = widgets;

        await widgets.setAmount({ value: amount, currency: "KRW" });
        await widgets.renderPaymentMethods({
          selector: "#payment-methods",
          variantKey: "DEFAULT",
        });
        await widgets.renderAgreement({
          selector: "#payment-agreement",
          variantKey: "AGREEMENT",
        });

        if (!cancelled) {
          setReady(true);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "토스페이먼츠 위젯을 불러오지 못했습니다.";
        onMessage(message);
        setReady(false);
      }
    }

    renderWidget();

    return () => {
      cancelled = true;
      widgetsRef.current = null;
      setReady(false);
    };
  }, [amount, clientKey, customerKey, onMessage]);

  useEffect(() => {
    async function updateAmount() {
      if (!widgetsRef.current || !ready) return;
      await widgetsRef.current.setAmount({ value: amount, currency: "KRW" });
    }

    updateAmount();
  }, [amount, ready]);

  async function requestPayment() {
    if (disabled || amount <= 0) {
      onMessage("결제할 상품이 없습니다.");
      return;
    }

    if (!clientKey || !widgetsRef.current) {
      onMessage("토스페이먼츠 클라이언트 키가 필요합니다. .env.local에 NEXT_PUBLIC_TOSS_CLIENT_KEY를 추가해주세요.");
      return;
    }

    const orderId = `rookiefit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(
      "rookiefit-pending-payment",
      JSON.stringify({ orderId, amount, orderName }),
    );

    await widgetsRef.current.requestPayment({
      orderId,
      orderName,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      customerName,
      customerEmail,
    });
  }

  if (!clientKey) {
    return (
      <div className="toss-widget-fallback">
        <strong>토스페이먼츠 키가 아직 없습니다.</strong>
        <p>
          결제위젯 구조는 준비되어 있습니다. 실제 테스트를 하려면
          <code>NEXT_PUBLIC_TOSS_CLIENT_KEY</code>와 <code>TOSS_SECRET_KEY</code>를
          환경변수에 추가해주세요.
        </p>
        <button className="button primary checkout-button" type="button" onClick={requestPayment}>
          결제하기
        </button>
      </div>
    );
  }

  return (
    <div className="toss-widget">
      <div id="payment-methods" />
      <div id="payment-agreement" />
      <button
        className="button primary checkout-button"
        disabled={!ready || disabled}
        type="button"
        onClick={requestPayment}
      >
        결제하기
      </button>
    </div>
  );
}
