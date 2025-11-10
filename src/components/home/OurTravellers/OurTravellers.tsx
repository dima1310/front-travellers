"use client";

import { useTravellersQuery } from "@/services/queries/useTravellersQuery";
import TravellersList from "./TravellersList/TravellersList";
import styles from "./OurTravellers.module.css";

export default function OurTravellers() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useTravellersQuery();

  const travellers = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.section} id="travellers">
      <div className={styles.container}>
        <h2 className={styles.title}>Наші мандрівники</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <TravellersList travellers={travellers} />
        )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={styles.button}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Переглянути всіх"}
          </button>
        )}
      </div>
    </section>
  );
}
