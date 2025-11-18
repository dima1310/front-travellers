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

  // собираем все страницы в один массив
  const allTravellers =
    data?.pages?.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  // 12 — десктоп, 8 — планшет/мобілка
  const initialCount = useMemo(
    () => (isMobile || isTablet ? 8 : 12),
    [isMobile, isTablet]
  );

  const [visibleCount, setVisibleCount] = useState(initialCount);

  // сбрасываем количество при смене брейкпоинта / новом наборе данных
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [initialCount, allTravellers.length]);

  // если участников меньше initialCount, дотягиваем с сервера
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
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          {/* заголовок ВНУТРИ синего блока */}
          <h1 className={styles.title}>Наші мандрівники</h1>

          {isLoading && (
            <p className={styles.status}>Завантаження...</p>
          )}

          {isError && (
            <p className={styles.status}>
              Сталася помилка під час завантаження мандрівників:{" "}
              {error instanceof Error
                ? error.message
                : "спробуйте пізніше"}
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
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Завантаження..."
                      : "Переглянути всіх"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
