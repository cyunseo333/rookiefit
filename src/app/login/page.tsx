"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Header } from "@/components/Header";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const { login, signUp, user } = useStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [status, setStatus] = useState("");

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = login(String(form.get("email")), String(form.get("password")));
    setStatus(result.message);
  }

  function submitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const passwordConfirm = String(form.get("passwordConfirm"));
    if (password !== passwordConfirm) {
      setStatus("비밀번호와 비밀번호 확인이 같지 않습니다.");
      return;
    }
    const result = signUp({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password,
      bodyType: String(form.get("bodyType")),
    });
    setStatus(result.message);
  }

  return (
    <>
      <div className="notice">Supabase 연결 전까지는 실습용 계정으로 저장됩니다.</div>
      <Header />
      <main className="page">
        <div className="layout">
          <section>
            <h1 className="page-title">Member Login</h1>
            <p className="hero-copy">
              로그인하면 장바구니와 주문내역이 내 계정 기준으로 저장됩니다.
              다음 단계에서 Supabase Auth로 실제 회원 인증을 연결합니다.
            </p>
            {user ? (
              <div className="status">
                현재 {user.name}님으로 로그인되어 있습니다.{" "}
                <Link href="/orders">주문내역 보기</Link>
              </div>
            ) : null}
          </section>
          <section className="panel">
            <div className="tabs">
              <button
                className={`tab ${mode === "login" ? "active" : ""}`}
                type="button"
                onClick={() => setMode("login")}
              >
                로그인
              </button>
              <button
                className={`tab ${mode === "signup" ? "active" : ""}`}
                type="button"
                onClick={() => setMode("signup")}
              >
                회원가입
              </button>
            </div>

            {mode === "login" ? (
              <form className="form-grid" onSubmit={submitLogin}>
                <div className="field">
                  <label htmlFor="loginEmail">이메일</label>
                  <input id="loginEmail" name="email" type="email" defaultValue="rookie@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="loginPassword">비밀번호</label>
                  <input id="loginPassword" name="password" type="password" defaultValue="rookie1234" required />
                </div>
                <button className="button primary" type="submit">
                  로그인하기
                </button>
              </form>
            ) : (
              <form className="form-grid" onSubmit={submitSignUp}>
                <div className="field">
                  <label htmlFor="name">이름</label>
                  <input id="name" name="name" defaultValue="김서연" required />
                </div>
                <div className="field">
                  <label htmlFor="email">이메일</label>
                  <input id="email" name="email" type="email" defaultValue="rookie@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="password">비밀번호</label>
                  <input id="password" name="password" type="password" defaultValue="rookie1234" minLength={6} required />
                </div>
                <div className="field">
                  <label htmlFor="passwordConfirm">비밀번호 확인</label>
                  <input id="passwordConfirm" name="passwordConfirm" type="password" defaultValue="rookie1234" minLength={6} required />
                </div>
                <div className="field">
                  <label htmlFor="bodyType">관심 체형</label>
                  <select id="bodyType" name="bodyType" defaultValue="웨이브">
                    <option>웨이브</option>
                    <option>스트레이트</option>
                    <option>내추럴</option>
                    <option>아직 모르겠어요</option>
                  </select>
                </div>
                <button className="button primary" type="submit">
                  회원가입하기
                </button>
              </form>
            )}

            {status ? <div className="status">{status}</div> : null}
          </section>
        </div>
      </main>
    </>
  );
}
