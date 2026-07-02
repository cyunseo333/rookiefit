import { Suspense } from "react";
import { Header } from "@/components/Header";
import { PaymentSuccessClient } from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<main className="payment-result">결제 결과를 확인하고 있습니다.</main>}>
        <PaymentSuccessClient />
      </Suspense>
    </>
  );
}
