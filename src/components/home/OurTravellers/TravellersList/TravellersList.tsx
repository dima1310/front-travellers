import React from "react";
import type { TravellerCard } from "@/services/api/travellersApi";
import styles from "./TravellersList.module.css";

interface TravellersListProps {
  travellers: TravellerCard[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  if (!travellers || travellers.length === 0) {
    return <p className={styles.empty}>No travellers found.</p>;
  }

  return (
    <ul className={styles.list}>
      {travellers.map((traveller) => (
        <li key={traveller._id} className={styles.item}>
          <img
            src={traveller.avatarUrl || "/default-avatar.png"}
            alt={traveller.name}
            className={styles.avatar}
          />
          <h3 className={styles.name}>{traveller.name}</h3>
          {traveller.bio && <p className={styles.bio}>{traveller.bio}</p>}
        </li>
      ))}
    </ul>
  );
}