"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import HomeStyles from "@/app/Home.module.css";
import styles from "./TravellerInfo.module.css";
import { getTravellerById } from "@/services/api/travellersApi";

interface TravellerInfoProps {
  id: string;
}

export default function TravellerInfo({ id }: TravellerInfoProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["traveller", id],
    queryFn: () => getTravellerById(id),
  });

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={HomeStyles.container}>
          <div className={`container ${styles.inner}`}>
            <p className={styles.loading}>Завантаження...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className={styles.section}>
        <div className={HomeStyles.container}>
          <div className={`container ${styles.inner}`}>
            <p className={styles.error}>Помилка завантаження профілю.</p>
          </div>
        </div>
      </section>
    );
  }

  const { name, avatar, bio } = data as {
    name: string;
    avatar?: string;
    bio?: string;
  };

  const avatarSrc =
    avatar && avatar.trim() !== "" ? avatar : "/icons/user.svg";

  return (
    <section className={styles.section}>
      <div className={HomeStyles.container}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.profile}>
            <div className={styles.avatarWrapper}>
              <Image
                src={avatarSrc}
                alt={name}
                width={199}
                height={199}
                className={styles.avatar}
              />
            </div>

            <div className={styles.info}>
              <h1 className={styles.name}>{name}</h1>
              <p className={styles.bio}>
                {bio || "Мандрівник поки не додав опис."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
