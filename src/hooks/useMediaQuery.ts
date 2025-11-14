"use client";
import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  // 1) Початкове значення визначаємо одразу (без setState)
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // 2) Оновлюємо стан тільки при зміні розміру
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}