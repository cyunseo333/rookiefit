"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function AddToCartButton({
  productId,
  sizes,
}: {
  productId: string;
  sizes: string[];
}) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  function addSelectedToCart() {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(productId);
    }
  }

  return (
    <div className="purchase-box">
      <div className="field">
        <label htmlFor="sizeSelect">사이즈</label>
        <select
          id="sizeSelect"
          value={selectedSize}
          onChange={(event) => setSelectedSize(event.target.value)}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="quantitySelect">수량</label>
        <select
          id="quantitySelect"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5].map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-option">선택 옵션: {selectedSize} / {quantity}개</div>
      <div className="actions">
        <button className="button secondary" type="button" onClick={addSelectedToCart}>
          장바구니
        </button>
        <Link className="button primary" href="/checkout" onClick={addSelectedToCart}>
          구매하기
        </Link>
      </div>
    </div>
  );
}
