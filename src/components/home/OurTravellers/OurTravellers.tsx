"use client";

import Link from "next/link";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import { useTravellersQuery } from "@/services/queries/useTravellersQuery";
import styles from "./OurTravellers.module.css";

export default function OurTravellers() {
  const { data, isLoading, isError } = useTravellersQuery();

  // берем всех мандрівників с бэка
  const allTravellers =
    data?.pages?.flatMap((page) => (Array.isArray(page) ? page : [])) ?? [];

  // на главной показываем только первые 4 карточки
  const travellersToShow = allTravellers.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наші мандрівники</h2>

        {isLoading && <p className={styles.loading}>Завантаження...</p>}

        {isError && (
          <p className={styles.loading}>
            Щось пішло не так, спробуйте пізніше
          </p>
        )}

        {!isLoading && !isError && travellersToShow.length > 0 && (
          <>
            {/* синій блок з картками, як на макеті */}
            <div className={styles.cardsWrapper}>
              <TravellersList travellers={travellersToShow} />
            </div>

            {/* кнопка під блоком, веде на сторінку /travellers */}
            <Link href="/travellers" className={styles.button}>
              Переглянути всіх
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
