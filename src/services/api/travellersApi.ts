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

/** Публічний профіль користувача: GET /users/{userId} -> { data: { user, articles } } */
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

/** Список авторів (публічно): GET /users?page=1 -> { data: { users: [...] } } */
async function listTravellers(page = 1): Promise<TravellerCard[]> {
  const res = await fetch(`${BASE}/users?page=${page}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Users request failed: ${res.status}`);

  const json: {
    data?: { users?: RawTraveller[] } | RawTraveller[];
  } = await res.json();

  const users: RawTraveller[] = Array.isArray(json.data)
    ? (json.data as RawTraveller[])
    : (json.data?.users ?? []);

  return users.map((u) => ({
    _id: String(u._id),
    name: u.name,
    avatarUrl: u.avatar ?? undefined,
    bio: u.bio ?? "",
  }));
}

/** Об'єкт API для хуков */
export const travellersApi = {
  list: listTravellers,
  getById: getTravellerById,
};
