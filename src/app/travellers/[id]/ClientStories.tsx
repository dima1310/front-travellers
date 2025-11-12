"use client";

import { useState } from "react";
import type { Story } from "@/types/story.types";

type Props = {
  initialStories: Story[];
  userId: string;
};

export default function ClientStories({ initialStories }: Props) {
  // Простейший клиентский контейнер — на реальном API заменим на useInfiniteQuery
  const [stories] = useState<Story[]>(initialStories);

  if (stories.length === 0) return null;

  return (
    <section>
      <h2>Історії мандрівника</h2>
      <ul>
        {stories.map((s) => (
          <li key={s._id}>{s.title}</li>
        ))}
      </ul>
    </section>
  );
}

