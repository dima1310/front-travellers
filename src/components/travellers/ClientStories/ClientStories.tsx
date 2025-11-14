"use client";
import type { Story } from "@/types/story.types";

type Props = {
  stories: Story[];
  initialDesktopCount?: number;
  initialTabletMobileCount?: number;
};

export default function ClientStories({
  stories,
  initialDesktopCount = 6,
  initialTabletMobileCount = 4,
}: Props) {
  const initial = stories.slice(0, initialDesktopCount);
  return (
    <div>
      {initial.map((s) => (
        <article key={s._id}>
          <h3>{s.title}</h3>
          {/* TODO: оформити картку по дизайну */}
        </article>
      ))}
    </div>
  );
}
