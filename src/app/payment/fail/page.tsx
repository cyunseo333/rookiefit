import { Suspense } from "react";
import { Header } from "@/components/Header";
import { PaymentFailClient } from "./PaymentFailClient";

export default function PaymentFailPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<main className="payment-result">결제 실패 정보를 확인하고 있습니다.</main>}>
        <PaymentFailClient />
      </Suspense>
    </>
  );
}
