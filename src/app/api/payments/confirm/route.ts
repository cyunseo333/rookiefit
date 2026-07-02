import { NextResponse } from "next/server";

type ConfirmPaymentRequest = {
  paymentKey?: string;
  orderId?: string;
  amount?: number;
};

export async function POST(request: Request) {
  const secretKey = process.env.TOSS_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "TOSS_SECRET_KEY 환경변수가 필요합니다.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ConfirmPaymentRequest;
  const { paymentKey, orderId, amount } = body;

  if (!paymentKey || !orderId || typeof amount !== "number") {
    return NextResponse.json(
      {
        ok: false,
        message: "paymentKey, orderId, amount가 필요합니다.",
      },
      { status: 400 },
    );
  }

  const encryptedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");
  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encryptedSecretKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": orderId,
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: data.message || "결제 승인에 실패했습니다.",
        code: data.code,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    ok: true,
    payment: data,
  });
}
