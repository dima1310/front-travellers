const BASE = process.env.NEXT_PUBLIC_API_URL!;

// Расширенные типы для API
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

/** Получение публичного профиля пользователя */
export async function getTravellerById(id: string): Promise<TravellerProfile> {
  const res = await fetch(`${BASE}/users/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Profile request failed: ${res.status}`);

  const json: {
    data?: {
      user?: {
        _id: string;
        name: string;
        avatar?: string;
        bio?: string;
        socialLinks?: {
          twitter?: string;
          facebook?: string;
          instagram?: string;
        };
      };
    };
  } = await res.json();

  if (!json.data?.user) throw new Error("Traveller not found");

  const { user } = json.data;
  return {
    _id: user._id,
    name: user.name,
    avatarUrl: user.avatar,
    bio: user.bio,
    socialLinks: user.socialLinks,
  };
}
