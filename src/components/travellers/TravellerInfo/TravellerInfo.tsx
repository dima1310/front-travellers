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

  const { name, avatarUrl, bio, socialLinks } = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <Image
              src={avatarUrl || "/avatar-placeholder.jpg"}
              alt={name}
              width={240}
              height={240}
              className={styles.avatar}
            />
          </div>
          <div className={styles.info}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.bio}>
              {bio || "Мандрівник поки не додав опис."}
            </p>

            {socialLinks && (
              <ul className={styles.social}>
                {socialLinks.instagram && (
                  <li>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                )}
                {socialLinks.facebook && (
                  <li>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                )}
                {socialLinks.twitter && (
                  <li>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X (Twitter)
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
