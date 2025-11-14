"use client";

import { useEffect, useMemo, useState } from "react";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTravellersQuery } from "@/services/queries/useTravellersQuery";
import styles from "./page.module.css";

export default function TravellersPage() {
  const isTablet = useMediaQuery("(max-width: 1279px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTravellersQuery();

  // збираємо всі сторінки в один масив
  const allTravellers =
    data?.pages?.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  // 12 — десктоп, 8 — планшет/мобілка
  const initialCount = useMemo(
    () => (isMobile || isTablet ? 8 : 12),
    [isMobile, isTablet]
  );

  const [visibleCount, setVisibleCount] = useState(initialCount);

  // при зміні брейкпоінта або кількості мандрівників — скидаємо лічильник
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [initialCount, allTravellers.length]);

  // авто-догрузка сторінок, щоб на старті було 8/12, а не 4
  useEffect(() => {
    if (
      !isLoading &&
      allTravellers.length < initialCount &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    isLoading,
    allTravellers.length,
    initialCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const visibleTravellers = allTravellers.slice(0, visibleCount);

  // крок догрузки: +4 завжди
  const increment = 4;

  const canShowMore =
    (allTravellers.length > 0 && visibleCount < allTravellers.length) ||
    hasNextPage;

  const handleShowMore = async () => {
    const needMoreFromServer =
      visibleCount + increment > allTravellers.length &&
      hasNextPage &&
      !isFetchingNextPage;

    if (needMoreFromServer) {
      await fetchNextPage();
    }

    setVisibleCount((prev) =>
      Math.min(prev + increment, allTravellers.length)
    );
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
          {/* обёртка шириною 1312px під сітку, як у макеті */}
          <div className={styles.cardsWrapper}>
            <TravellersList travellers={visibleTravellers} />
          </div>

          {canShowMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                className={styles.loadMoreButton}
                onClick={handleShowMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Завантаження..." : "Переглянути ще"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
