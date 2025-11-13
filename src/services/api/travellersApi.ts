import { api } from "@/services/api/axiosConfig";

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

function toCard(u: RawTraveller): TravellerCard {
  return {
    _id: String(u._id),
    name: u.name,
    avatarUrl: u.avatar ?? undefined,
    bio: u.bio ?? "",
  };
}

type WithDataArray = { data?: RawTraveller[] };
type WithDataUsers = { data?: { users?: RawTraveller[] } };
type WithItems = { items?: RawTraveller[] };

type TravellersApiResponse =
  | RawTraveller[]
  | WithDataArray
  | WithDataUsers
  | WithItems;

function normalizeUsers(json: TravellersApiResponse): RawTraveller[] {
  if (Array.isArray(json)) return json;

  if ("data" in json && Array.isArray(json.data)) {
    return json.data;
  }

  if (
    "data" in json &&
    json.data &&
    typeof json.data === "object" &&
    "users" in json.data &&
    Array.isArray(json.data.users)
  ) {
    return json.data.users;
  }

  if ("items" in json && Array.isArray(json.items)) {
    return json.items;
  }

  return [];
}

export async function getTravellerById(id: string): Promise<TravellerProfile> {
  const res = await api.get<{ data?: { user?: BackendUser } }>(`/users/${id}`);

  const u = res.data?.data?.user;
  if (!u) throw new Error("User not found");

  return {
    _id: u._id,
    name: u.name,
    avatarUrl: u.avatar ?? undefined,
    bio: u.bio ?? "",
    socialLinks: u.socialLinks,
  };
}

async function listTravellers(
  page?: number,
  limit?: number
): Promise<TravellerCard[]>;

async function listTravellers(opts?: {
  page?: number;
  limit?: number;
}): Promise<TravellerCard[]>;

async function listTravellers(
  a?: number | { page?: number; limit?: number },
  b?: number
): Promise<TravellerCard[]> {
  const page = typeof a === "number" ? a : a?.page ?? 1;
  const limit = typeof a === "number" ? b ?? 12 : a?.limit ?? 12;

  const res = await api.get<TravellersApiResponse>("/users", {
    params: { page, limit },
  });

  const users = normalizeUsers(res.data);
  return users.map(toCard);
}

export const travellersApi = {
  list: listTravellers,
  getById: getTravellerById,
};
