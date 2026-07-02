"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export function Header() {
  const { cart, user, logout } = useStore();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="nav">
          <Link href="/">SHOP</Link>
          <span>STYLE GUIDE</span>
          <span>BODY TYPE</span>
        </nav>
        <Link className="logo" href="/">
          RookieFit
        </Link>
        <div className="tools">
          <span>SEARCH</span>
          {user ? <Link href="/orders">{user.name}님</Link> : <Link href="/login">LOGIN</Link>}
          {user ? <Link href="/orders">ORDERS</Link> : null}
          <Link href="/cart">BAG ({count})</Link>
          {user ? (
            <button className="text-button" type="button" onClick={logout}>
              LOGOUT
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
