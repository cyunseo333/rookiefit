"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, type Product } from "@/lib/products";

export type User = {
  name: string;
  email: string;
  bodyType: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Order = {
  id: string;
  orderedAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

type StoreContextValue = {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  login: (email: string, password: string) => { ok: boolean; message: string };
  signUp: (input: User & { password: string }) => { ok: boolean; message: string };
  logout: () => void;
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  createOrder: () => Order | null;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CURRENT_USER_KEY = "rookiefit-next-current-user";
const USERS_KEY = "rookiefit-next-users";
const GUEST_CART_KEY = "rookiefit-next-cart-guest";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function cartKey(user: User | null) {
  return user ? `rookiefit-next-cart:${user.email}` : GUEST_CART_KEY;
}

function ordersKey(user: User | null) {
  return user ? `rookiefit-next-orders:${user.email}` : "rookiefit-next-orders-guest";
}

function mergeCart(base: CartItem[], extra: CartItem[]) {
  const merged = [...base];
  extra.forEach((item) => {
    const existing = merged.find((entry) => entry.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      merged.push(item);
    }
  });
  return merged;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const currentUser = readJson<User | null>(CURRENT_USER_KEY, null);
    // Browser storage is the temporary source of truth until Supabase Auth is connected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(currentUser);
    setCart(readJson<CartItem[]>(cartKey(currentUser), []));
    setOrders(readJson<Order[]>(ordersKey(currentUser), []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeJson(cartKey(user), cart);
  }, [cart, ready, user]);

  useEffect(() => {
    if (!ready || !user) return;
    writeJson(ordersKey(user), orders);
  }, [orders, ready, user]);

  function setSession(nextUser: User) {
    writeJson(CURRENT_USER_KEY, nextUser);
    const guestCart = readJson<CartItem[]>(GUEST_CART_KEY, []);
    const userCartKey = cartKey(nextUser);
    const userCart = readJson<CartItem[]>(userCartKey, []);
    const nextCart = mergeCart(userCart, guestCart);
    localStorage.removeItem(GUEST_CART_KEY);
    setUser(nextUser);
    setCart(nextCart);
    setOrders(readJson<Order[]>(ordersKey(nextUser), []));
  }

  const value = useMemo<StoreContextValue>(
    () => ({
      user,
      cart,
      orders,
      login(email, password) {
        const users = readJson<Record<string, User & { password: string }>>(
          USERS_KEY,
          {},
        );
        const normalizedEmail = email.trim().toLowerCase();
        const foundUser = users[normalizedEmail];
        if (!foundUser) {
          return { ok: false, message: "가입된 이메일이 없습니다." };
        }
        if (foundUser.password !== password) {
          return { ok: false, message: "비밀번호가 맞지 않습니다." };
        }
        setSession({
          name: foundUser.name,
          email: foundUser.email,
          bodyType: foundUser.bodyType,
        });
        return { ok: true, message: "로그인되었습니다." };
      },
      signUp(input) {
        const users = readJson<Record<string, User & { password: string }>>(
          USERS_KEY,
          {},
        );
        const normalizedEmail = input.email.trim().toLowerCase();
        if (users[normalizedEmail]) {
          return { ok: false, message: "이미 가입된 이메일입니다." };
        }
        const nextUser = {
          name: input.name.trim(),
          email: normalizedEmail,
          bodyType: input.bodyType,
          password: input.password,
        };
        users[normalizedEmail] = nextUser;
        writeJson(USERS_KEY, users);
        setSession({
          name: nextUser.name,
          email: nextUser.email,
          bodyType: nextUser.bodyType,
        });
        return { ok: true, message: "회원가입이 완료되었습니다." };
      },
      logout() {
        localStorage.removeItem(CURRENT_USER_KEY);
        setUser(null);
        setCart(readJson<CartItem[]>(GUEST_CART_KEY, []));
        setOrders([]);
      },
      addToCart(productId) {
        const product = findProduct(productId);
        if (!product) return;
        setCart((current) => {
          const existing = current.find((item) => item.id === productId);
          if (existing) {
            return current.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...current, { ...product, quantity: 1 }];
        });
      },
      updateQuantity(productId, quantity) {
        setCart((current) =>
          current
            .map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeFromCart(productId) {
        setCart((current) => current.filter((item) => item.id !== productId));
      },
      clearCart() {
        setCart([]);
      },
      createOrder() {
        if (!user || cart.length === 0) return null;
        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const shipping = subtotal >= 70000 ? 0 : 3000;
        const order = {
          id: `RF-${Date.now()}`,
          orderedAt: new Date().toISOString(),
          items: cart,
          subtotal,
          shipping,
          total: subtotal + shipping,
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        return order;
      },
    }),
    [cart, orders, user],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
