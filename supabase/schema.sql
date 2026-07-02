create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  category_label text not null,
  price integer not null,
  tag text not null,
  body_type text not null,
  reason text not null,
  description text not null,
  image text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  body_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subtotal integer not null,
  shipping integer not null,
  total integer not null,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  product_name text not null,
  price integer not null,
  quantity integer not null check (quantity > 0)
);

alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Products are readable by everyone"
on public.products for select
using (true);

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can manage own cart"
on public.cart_items for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can read own orders"
on public.orders for select
using (auth.uid() = user_id);

create policy "Users can create own orders"
on public.orders for insert
with check (auth.uid() = user_id);

create policy "Users can read own order items"
on public.order_items for select
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

create policy "Users can create own order items"
on public.order_items for insert
with check (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);
