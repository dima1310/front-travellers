"use client";

import { useEffect, useMemo, useState } from "react";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTravellersQuery } from "@/services/queries/useTravellersQuery";
import styles from "./page.module.css";

export default function TravellersPage() {
  const isTablet = useMediaQuery("(max-width: 1279px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { data, isLoading, isError, error } = useTravellersQuery();

  // збираємо всі сторінки в один масив
  const allTravellers =
    data?.pages?.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  // 12 — десктоп, 8 — планшет/мобілка
  const initialCount = useMemo(
    () => (isMobile || isTablet ? 8 : 12),
    [isMobile, isTablet]
  );

  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    // при зміні брейкпоінта або кількості мандрівників
    setVisibleCount(initialCount);
  }, [initialCount, allTravellers.length]);

  const visibleTravellers = allTravellers.slice(0, visibleCount);
  const canShowMore = visibleCount < allTravellers.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, allTravellers.length));
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Мандрівники</h1>

      {isLoading && <p className={styles.status}>Завантаження...</p>}

      {isError && (
        <p className={styles.status}>
          Сталася помилка під час завантаження мандрівників:{" "}
          {error instanceof Error ? error.message : "спробуйте пізніше"}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <TravellersList travellers={visibleTravellers} />

          {canShowMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                className={styles.loadMoreButton}
                onClick={handleShowMore}
              >
                Переглянути всі
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
