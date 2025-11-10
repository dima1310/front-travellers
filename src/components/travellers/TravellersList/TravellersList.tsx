"use client";

import TravellerCard from "./TravellerCard";
import styles from "./TravellersList.module.css";
import { Traveller } from "@/types/traveller.types";

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={styles.list}>
      {travellers.map((traveller) => (
        <TravellerCard key={traveller.id} traveller={traveller} />
      ))}
    </ul>
  );
}
