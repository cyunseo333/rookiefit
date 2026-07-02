"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useStore();

  return (
    <div className="actions">
      <button className="button secondary" type="button" onClick={() => addToCart(productId)}>
        장바구니 담기
      </button>
      <Link className="button primary" href="/checkout">
        구매하기
      </Link>
    </div>
  );
}
