// src/services/api/travellersApi.ts
const BASE = process.env.NEXT_PUBLIC_API_URL!;

export type TravellerProfile = {
  _id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
};

export type TravellerCard = {
  _id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
};

type SocialLinks = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

interface RawTraveller {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
}
type BackendUser = RawTraveller & { socialLinks?: SocialLinks };

// -------- helpers --------
function toCard(u: RawTraveller): TravellerCard {
  return {
    _id: String(u._id),
    name: u.name,
    avatarUrl: u.avatar ?? undefined,
    bio: u.bio ?? "",
  };
}

// Возможные формы ответа бэка
type WithDataArray = { data?: RawTraveller[] };
type WithDataUsers = { data?: { users?: RawTraveller[] } };
type WithItems = { items?: RawTraveller[] };
type TravellersApiResponse =
  | RawTraveller[]
  | WithDataArray
  | WithDataUsers
  | WithItems;

/** Нормализация разных форм ответа без any */
function normalizeUsers(json: unknown): RawTraveller[] {
  const data = json as TravellersApiResponse;

  if (Array.isArray(data)) return data;

  const asDataArray = data as WithDataArray;
  if (Array.isArray(asDataArray?.data)) return asDataArray.data!;

  const asDataUsers = data as WithDataUsers;
  if (Array.isArray(asDataUsers?.data?.users)) return asDataUsers.data!.users!;

  const asItems = data as WithItems;
  if (Array.isArray(asItems?.items)) return asItems.items!;

  return [];
}

// -------- API --------
/** Публічний профіль користувача: GET /users/{userId} -> { data: { user, ... } } */
export async function getTravellerById(id: string): Promise<TravellerProfile> {
  const res = await fetch(`${BASE}/users/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Profile request failed: ${res.status}`);

  const json: { data?: { user?: BackendUser } } = await res.json();
  const u = json.data?.user;
  if (!u) throw new Error("User not found");

  return {
    _id: u._id,
    name: u.name,
    avatarUrl: u.avatar ?? undefined,
    bio: u.bio ?? "",
    socialLinks: u.socialLinks ?? undefined,
  };
}

// Перегрузки для list — поддерживаем (page, limit) и объект
async function listTravellers(page?: number, limit?: number): Promise<TravellerCard[]>;
async function listTravellers(opts?: { page?: number; limit?: number }): Promise<TravellerCard[]>;
async function listTravellers(
  a?: number | { page?: number; limit?: number },
  b?: number
): Promise<TravellerCard[]> {
  const page = typeof a === "number" ? a : a?.page ?? 1;
  const limit = typeof a === "number" ? (b ?? 12) : a?.limit ?? 12;

  const url = new URL(`${BASE}/users`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`Users request failed: ${res.status}`);

  const json = await res.json();
  const users = normalizeUsers(json);
  return users.map(toCard);
}

/** Об'єкт API для хуков */
export const travellersApi = {
  list: listTravellers,
  getById: getTravellerById,
};
