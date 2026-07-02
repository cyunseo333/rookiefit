# RookieFit Next

RookieFit의 Next.js + Supabase + Vercel 전환용 프로젝트입니다.

기존 정적 HTML 프로젝트는 상위 폴더에 그대로 두고, 이 폴더에서 안전하게 새 구조를 개발합니다.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase 준비
- Vercel 배포 준비

## Pages

- `/`: 쇼핑몰 메인
- `/products/[id]`: 상품 상세
- `/cart`: 장바구니
- `/checkout`: 실습용 결제
- `/orders`: 주문내역
- `/login`: 로그인 / 회원가입

## Local Run

```bash
npm run dev
```

## Supabase Setup

1. Supabase 프로젝트를 만든다.
2. `supabase/schema.sql`을 Supabase SQL Editor에서 실행한다.
3. `.env.example`을 참고해 `.env.local`을 만든다.
4. 아래 값을 넣는다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

현재 화면은 Supabase 연결 전에도 확인할 수 있도록 브라우저 저장소 기반으로 동작합니다.
다음 단계에서 Supabase Auth, cart_items, orders 테이블에 실제 저장되도록 연결하면 됩니다.

## Deploy

Vercel에서 `rookiefit-next` 폴더를 프로젝트 루트로 연결하고, Supabase 환경변수를 등록하면 됩니다.
