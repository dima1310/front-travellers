import { redirect } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePage() {
  const BASE = process.env.NEXT_PUBLIC_API_URL;

  // Fetch current user with savedStories
  const res = await fetch(`${BASE}/users/current`, {
    cache: "no-store",
    credentials: "include", // Important for cookies
  });

  if (!res.ok) {
    redirect("/auth/login");
  }

  const json = await res.json();
  const user = json.data;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <ProfilePageClient
      userId={user._id}
      savedStoryIds={user.savedStories ?? []}
    />
  );
}
