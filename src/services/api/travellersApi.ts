import { api } from "@/services/api/axiosConfig";
import type { Traveller } from "@/types/traveller.types";

type SocialLinks = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type TravellerProfile = {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
  socialLinks?: SocialLinks;
};

interface RawTraveller {
  _id: string;
  name: string;
  avatar?: string; // как приходит из бэка
  bio?: string;
  country?: string;
  socialLinks?: SocialLinks;
}

type WithDataArray = { data?: RawTraveller[] };
type WithDataUsers = { data?: { users?: RawTraveller[] } };
type WithItems = { items?: RawTraveller[] };

type TravellersApiResponse =
  | RawTraveller[]
  | WithDataArray
  | WithDataUsers
  | WithItems;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// =====================
//  AVATAR NORMALIZER
// =====================
function normalizeAvatar(path?: string): string | undefined {
  if (!path) return undefined;

  // если бэк вернул полный URL
  if (path.startsWith("http")) return path;

  // относительный путь -> дописываем базовый URL
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// =====================
//  NORMALIZATION
// =====================
function normalizeUsers(json: TravellersApiResponse): RawTraveller[] {
  if (Array.isArray(json)) return json;

  if ("data" in json && Array.isArray((json as WithDataArray).data)) {
    return (json as WithDataArray).data!;
  }

  if (
    "data" in json &&
    (json as WithDataUsers).data &&
    Array.isArray((json as WithDataUsers).data!.users)
  ) {
    return (json as WithDataUsers).data!.users!;
  }

  if ("items" in json && Array.isArray((json as WithItems).items)) {
    return (json as WithItems).items!;
  }

  return [];
}

// =====================
//  TRANSFORMER
// =====================
function toTraveller(u: RawTraveller): Traveller {
  return {
    _id: String(u._id),
    name: u.name,
    bio: u.bio ?? "",
    country: u.country,
    avatar: normalizeAvatar(u.avatar),
  };
}

// =====================
//  GET BY ID (профиль)
// =====================
export async function getTravellerById(id: string): Promise<TravellerProfile> {
  const res = await api.get<{ data?: { user?: RawTraveller } }>(`/users/${id}`);

  const u = res.data?.data?.user;
  if (!u) throw new Error("User not found");

  return {
    _id: String(u._id),
    name: u.name,
    bio: u.bio ?? "",
    avatar: normalizeAvatar(u.avatar),
    socialLinks: u.socialLinks,
  };
}

// =====================
//  LIST USERS (карточки)
// =====================

export async function listTravellers(
  page?: number,
  limit?: number
): Promise<Traveller[]>;

export async function listTravellers(opts?: {
  page?: number;
  limit?: number;
}): Promise<Traveller[]>;

export async function listTravellers(
  a?: number | { page?: number; limit?: number },
  b?: number
): Promise<Traveller[]> {
  const page = typeof a === "number" ? a : a?.page ?? 1;
  const limit = typeof a === "number" ? b ?? 12 : a?.limit ?? 12;

  const res = await api.get<TravellersApiResponse>("/users", {
    params: { page, limit },
  });

  const users = normalizeUsers(res.data);
  return users.map(toTraveller);
}

export const travellersApi = {
  list: listTravellers,
  getById: getTravellerById,
};
