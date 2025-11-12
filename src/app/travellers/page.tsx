'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import TravellersList from '@/components/travellers/TravellersList/TravellersList';
import useMediaQuery from '@/hooks/useMediaQuery';
import type { Traveller } from '@/types/traveller.types';
import css from './page.module.css';
import LoadMoreButton from '@/components/ui/Button/LoadMoreButton/LoadMoreButton';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';
const CANDIDATE_PATHS = ['/users', '/travellers', '/profiles'];

function getApiOrigin() {
  try {
    const u = new URL(BASE);
    return `${u.protocol}//${u.host}`;
  } catch {
    return 'http://localhost:3000';
  }
}

type AnyTraveller = {
  _id?: string;
  id?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  avatarUrl?: string;
  photo?: string;
};

type AnyResponse =
  | {
      data?:
        | AnyTraveller[]
        | {
            items?: AnyTraveller[];
            users?: AnyTraveller[];
            results?: AnyTraveller[];
            data?: AnyTraveller[];
          };
      items?: AnyTraveller[];
      users?: AnyTraveller[];
      results?: AnyTraveller[];
    }
  | AnyTraveller[];

function normalizeAvatar(raw?: string) {
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${getApiOrigin()}${raw.startsWith('/') ? '' : '/'}${raw}`;
}

function mapToTraveller(t: AnyTraveller): Traveller {
  const id = t.id ?? t._id ?? '';
  const name = t.name ?? '';
  const bio = t.bio ?? '';
  const avatar = normalizeAvatar(t.avatarUrl ?? t.avatar ?? t.photo ?? '');
  return { id, name, bio, avatar };
}

function pickArray(json: AnyResponse): AnyTraveller[] {
  if (Array.isArray(json)) return json;
  const d = (json as any).data;
  return (
    (json as any).items ??
    (json as any).users ??
    (json as any).results ??
    (Array.isArray(d) ? d : d?.items ?? d?.users ?? d?.results ?? [])
  );
}

async function tryFetch(path: string, page: number, limit: number) {
  const url = `${BASE}${path}?page=${page}&limit=${limit}`;
  console.log('[Travellers] GET', url);
  const res = await fetch(url, { cache: 'no-store', credentials: 'include' });
  return { res, url };
}

async function fetchTravellers(page: number, limit: number): Promise<Traveller[]> {
  let lastErr: unknown = null;

  for (const path of CANDIDATE_PATHS) {
    try {
      const { res, url } = await tryFetch(path, page, limit);
      console.log('[Travellers] status', res.status, 'for', url);

      if (!res.ok) {
        if (res.status === 404) continue; // пробуем следующий путь
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
      }

      const json: AnyResponse = await res.json();
      const arr = pickArray(json);
      if (!Array.isArray(arr)) throw new Error('Unexpected response shape');
      return arr.map(mapToTraveller);
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr ?? new Error('All endpoints failed');
}

export default function TravellersPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const pageSize = useMemo(() => (isDesktop ? 12 : 8), [isDesktop]);

  const [items, setItems] = useState<Traveller[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firstLoadDone = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFirstPage() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTravellers(1, pageSize);
        if (cancelled) return;
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);
      } catch (e: any) {
        if (cancelled) return;
        console.error('[Travellers] load error:', e);
        setError(e?.message ?? 'Помилка завантаження');
        setItems([]);
        setHasMore(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    firstLoadDone.current = true;
    loadFirstPage();

    return () => {
      cancelled = true;
    };
  }, [pageSize]);

  async function handleLoadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const data = await fetchTravellers(nextPage, pageSize);
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (e: any) {
      console.error('[Travellers] load more error:', e);
      setError(e?.message ?? 'Помилка завантаження');
      setHasMore(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={css.section}>
      <h1 className={css.title}>Мандрівники</h1>

      {error && (
        <p className={css.error}>
          Не вдалося завантажити дані з бека: {error}
          <br />
          <small>BASE: {BASE}</small>
        </p>
      )}

      {items.length > 0 ? (
        <TravellersList items={items} />
      ) : (
        !loading && !error && <p className={css.empty}>Наразі немає мандрівників</p>
      )}

      {hasMore && (
        <div className={css.loadMoreWrapper}>
          <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Завантаження…' : 'Переглянути всі'}
          </LoadMoreButton>
        </div>
      )}
    </section>
  );
}


// 'use client';
// import { useEffect, useState } from "react";
// import TravellersList from "@/components/travellers/TravellersList/TravellersList";
// import useMediaQuery from "@/hooks/useMediaQuery";
// import { Traveller } from "@/types/traveller.types";
// import css from "./page.module.css";
// import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";

// export default function TravellersPage() {
//   // 👉 Поки немає бека — використовуємо заглушку (тимчасово!)
//   const travellersStub: Traveller[] = [
//     { id: "1", name: "Іван", bio: "Мандрівник", avatar: "https://i.pravatar.cc/150?img=3" },
//     { id: "2", name: "Олена", bio: "Любить гори", avatar: "https://i.pravatar.cc/150?img=2" },
//     { id: "3", name: "Максим", bio: "Подорожує автостопом",avatar:  "https://i.pravatar.cc/150?img=1" },
//     { id: "4", name: "Аліна", bio: "Було вже понад 20 країн",avatar:  "https://i.pravatar.cc/150?img=4" },
//     { id: "5", name: "Сергій", bio: "Фотограф і мандрівник", avatar: "https://i.pravatar.cc/150?img=5" },
//     { id: "6", name: "Марія", bio: "Цікавиться культурою Азії",avatar: "https://i.pravatar.cc/150?img=6"},
//     { id: "7", name: "Дмитро", bio: "Мото-подорожі", avatar: "https://i.pravatar.cc/150?img=7" },
//     { id: "8", name: "Ірина", bio: "Любить море і сонце", avatar: "https://i.pravatar.cc/150?img=8" },
//     { id: "9", name: "Олексій", bio: "Подорожує з рюкзаком", avatar: "https://i.pravatar.cc/150?img=3" },
//     { id: "10", name: "Світлана", bio: "Тревел-тіктокер", avatar: "https://i.pravatar.cc/150?img=10" },
//     { id: "11", name: "Арсен", bio: "Обожнює Карпати", avatar: "https://i.pravatar.cc/150?img=11" },
//     { id: "12", name: "Наталя", bio: "Подорожі з дітьми", avatar: "https://i.pravatar.cc/150?img=12" },
//     { id: "13", name: "Андрій", bio: "Любить море і сонце", avatar: "https://i.pravatar.cc/150?img=13" },
//     { id: "14", name: "Назар", bio: "Подорожує з рюкзаком", avatar: "https://i.pravatar.cc/150?img=14" },
//     { id: "15", name: "Олена", bio: "Тревел-тіктокер", avatar: "https://i.pravatar.cc/150?img=15" },
//     { id: "16", name: "Захар", bio: "Обожнює Карпати", avatar: "https://i.pravatar.cc/150?img=16" },
//     { id: "17", name: "Світлана", bio: "Подорожі з дітьми", avatar: "https://i.pravatar.cc/150?img=17" },
//   ];

//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const basePageSize = isDesktop ? 12 : 8;

//   const [limit, setLimit] = useState(basePageSize);

//   useEffect(() => {
//     setLimit(basePageSize);
//   }, [basePageSize]);

//   const visible = travellersStub.slice(0, limit);
//   const hasMore = limit < travellersStub.length;

//   return (
//     <section className={css.section}>
//       <h1 className={css.title}>Мандрівники</h1>

//       <TravellersList items={visible} />

//       {hasMore && (
//         <div className={css.loadMoreWrapper}>
//           <LoadMoreButton onClick={() => setLimit(prev => prev + 4)}>
//             Переглянути всі
//           </LoadMoreButton>
//         </div>
//       )}
//     </section>
//   );
// }
