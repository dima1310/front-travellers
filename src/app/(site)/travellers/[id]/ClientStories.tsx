"use client";

import { useState, useEffect } from "react";
import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";
import css from "./page.module.css";
import type { Story } from "@/types/story.types";

export default function ClientStories({
  stories,
  initialDesktopCount = 6,
  initialTabletMobileCount = 4,
}: {
  stories: Story[];
  initialDesktopCount?: number;
  initialTabletMobileCount?: number;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1280
      ? initialDesktopCount
      : initialTabletMobileCount
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const update = () => {
      setIsDesktop(media.matches);
      setVisible(media.matches ? initialDesktopCount : initialTabletMobileCount);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [initialDesktopCount, initialTabletMobileCount]);

  const visibleStories = stories.slice(0, visible);
  const hasMore = visible < stories.length;

  return (
    <div>
      <TravellersStories stories={visibleStories} />

      {hasMore && (
        <div className={css.travellerStoriesMore}>
          <LoadMoreButton
            onClick={() =>
              setVisible((prev) =>
                prev + (isDesktop ? initialDesktopCount : initialTabletMobileCount)
              )
            }
          >
            Показати ще
          </LoadMoreButton>
        </div>
      )}
    </div>
  );
}
