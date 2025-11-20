"use client";

import Link from "next/link";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import { useTravellersQuery } from "@/services/queries/useTravellersQuery";
import styles from "./OurTravellers.module.css";
import HomeStyles from "@/app/Home.module.css";

export default function OurTravellers() {
  const { data, isLoading, isError } = useTravellersQuery();

  const allTravellers =
    data?.pages?.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  const travellersToShow = allTravellers.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={HomeStyles.container}>
        <div className={`container ${styles.inner}`}>
          <h2 className={styles.title}>Наші мандрівники</h2>

          {isLoading && <p className={styles.loading}>Завантаження...</p>}

          {isError && (
            <p className={styles.loading}>
              Щось пішло не так, спробуйте пізніше
            </p>
          )}

          {!isLoading && !isError && travellersToShow.length > 0 && (
            <>
              <div className={styles.cardsWrapper}>
                <TravellersList travellers={travellersToShow} />
              </div>

              <Link href="/travellers" className={styles.button}>
                Переглянути всіх
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
