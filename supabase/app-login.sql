create table if not exists public.app_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('socio', 'chofer')),
  display_name text,
  member_code text,
  assigned_hotel text,
  shift text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists app_profiles_member_code_key
  on public.app_profiles (member_code)
  where member_code is not null;

alter table public.app_profiles enable row level security;

revoke all on table public.app_profiles from anon, authenticated;
revoke all on table public.app_profiles from public;
grant select on table public.app_profiles to authenticated;

drop policy if exists app_profiles_select_own on public.app_profiles;
create policy app_profiles_select_own
  on public.app_profiles for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role
  from public.app_profiles
  where user_id = auth.uid()
    and active
  limit 1;
$$;

revoke all on function public.current_app_role() from public, anon;
grant execute on function public.current_app_role() to authenticated;

create table if not exists public.app_registration_codes (
  code text primary key,
  role text not null check (role in ('socio', 'chofer')),
  active boolean not null default true,
  uses integer not null default 0 check (uses >= 0),
  max_uses integer not null default 1 check (max_uses > 0),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.app_registration_codes enable row level security;
revoke all on table public.app_registration_codes from anon, authenticated, public;

create or replace function public.consume_app_registration_code(
  p_code text,
  p_role text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.app_registration_codes
     set uses = uses + 1
   where code = upper(btrim(coalesce(p_code, '')))
     and role = p_role
     and active
     and uses < max_uses
     and (expires_at is null or expires_at > now());
  if not found then
    raise exception 'Código de registro inválido o expirado.';
  end if;
end;
$$;

revoke all on function public.consume_app_registration_code(text, text) from public, anon;

create or replace function public.app_email_for_access_code(p_code text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select u.email
  from public.app_profiles p
  join auth.users u on u.id = p.user_id
  where upper(btrim(p.member_code)) = upper(btrim(coalesce(p_code, '')))
    and p.active
  limit 1;
$$;

revoke all on function public.app_email_for_access_code(text) from public;
grant execute on function public.app_email_for_access_code(text) to anon, authenticated;

create or replace function public.handle_new_app_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_role text := meta ->> 'app_role';
  v_code text := upper(btrim(coalesce(meta ->> 'registration_code', '')));
  v_access_code text := upper(btrim(coalesce(meta ->> 'access_code', '')));
begin
  if v_role not in ('socio', 'chofer') then
    return new;
  end if;

  if v_role = 'socio' then
    perform public.consume_app_registration_code(v_code, 'socio');
  end if;

  insert into public.app_profiles as ap (
    user_id,
    role,
    display_name,
    member_code,
    assigned_hotel,
    shift,
    active
  )
  values (
    new.id,
    v_role,
    nullif(btrim(coalesce(meta ->> 'display_name', '')), ''),
    case when v_role = 'socio' then nullif(v_code, '') else nullif(v_access_code, '') end,
    case when v_role = 'chofer' then nullif(btrim(coalesce(meta ->> 'assigned_hotel', '')), '') else null end,
    case when v_role = 'chofer' then nullif(btrim(coalesce(meta ->> 'shift', '')), '') else null end,
    true
  )
  on conflict (user_id) do update set
    role = excluded.role,
    active = true,
    display_name = coalesce(excluded.display_name, ap.display_name),
    member_code = coalesce(excluded.member_code, ap.member_code),
    assigned_hotel = coalesce(excluded.assigned_hotel, ap.assigned_hotel),
    shift = coalesce(excluded.shift, ap.shift);

  return new;
end;
$$;

revoke all on function public.handle_new_app_user() from public, anon;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_app_user();
