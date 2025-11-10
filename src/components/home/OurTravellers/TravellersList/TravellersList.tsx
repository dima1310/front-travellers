import React from "react";
import type { Traveller } from "@/types/traveller.types";
import styles from "./TravellersList.module.css";

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  if (!travellers?.length) {
    return <p className={styles.empty}>No travellers found.</p>;
  }

  return (
    <ul className={styles.list}>
      {travellers.map((traveller) => (
        <li key={traveller.id} className={styles.item}>
          <img
            src={traveller.avatar}
            alt={traveller.name}
            className={styles.avatar}
          />
          <h3>{traveller.name}</h3>
          <p>{traveller.country}</p>
        </li>
      ))}
    </ul>
  );
}
