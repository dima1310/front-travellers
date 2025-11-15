"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import StoriesTabs from "@/components/stories/StoriesTabs/StoriesTabs";
import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import type { Story } from "@/types/story.types";

type ProfilePageClientProps = {
  userId: string;
  savedStoryIds: string[];
};

export default function ProfilePageClient({
  userId,
  savedStoryIds,
}: ProfilePageClientProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "created">("saved");

  // Single query that switches based on active tab
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["profile-stories", activeTab, userId],
    queryFn: async () => {
      const BASE = process.env.NEXT_PUBLIC_API_URL;

      if (activeTab === "saved") {
        if (!savedStoryIds.length) return [];

        // Fetch each saved story by ID
        const requests = savedStoryIds.map((id) =>
          fetch(`${BASE}/stories/${id}`)
            .then((r) => r.json())
            .catch(() => null)
        );

        const results = await Promise.all(requests);
        return results.map((r) => r?.data).filter(Boolean) as Story[];
      } else {
        // For created stories, use user endpoint
        const res = await fetch(`${BASE}/users/${userId}`);
        const json = await res.json();
        return (json.data?.articles ?? []) as Story[];
      }
    },
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <TravellerInfo id={userId} />
      <StoriesTabs activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <TravellersStories stories={stories} />
      )}
    </main>
  );
}
