"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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
    return <p className={styles.loading}>Завантаження...</p>;
  }

  if (isError || !data) {
    return <p className={styles.error}>Помилка завантаження профілю.</p>;
  }

  // ⚠️ БЕРЁМ avatar (как в TravellersListItem), а не avatarUrl
  const { name, avatar, bio } = data as {
    name: string;
    avatar?: string;
    bio?: string;
  };

  // безопасный src: если пусто — показываем ту же заглушку, что и в списке
  const avatarSrc = avatar && avatar.trim() !== "" ? avatar : "/icons/user.svg";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.profile}>
          {/* АВАТАР 240×240 — как в макете */}
          <div className={styles.avatarWrapper}>
            <Image
              src={avatarSrc}
              alt={name}
              width={199}
              height={199}
              className={styles.avatar}
            />
          </div>

          {/* ТЕКСТОВЫЙ БЛОК */}
          <div className={styles.info}>
            <h1 className={styles.name}>{name}</h1>

            <p className={styles.bio}>
              {bio || "Мандрівник поки не додав опис."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
