"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-detail-link" href={`/products/${product.id}`}>
        <div className="product-image">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 50vw, 25vw" />
        </div>
        <div className="product-info">
          <p className="product-title">{product.name}</p>
          <div className="price">{formatPrice(product.price)}</div>
          <span className="tag">{product.tag}</span>
        </div>
      </Link>
    </article>
  );
}
