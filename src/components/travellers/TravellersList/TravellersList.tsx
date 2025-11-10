"use client";
import css from "./TravellersList.module.css";
import { TravellersListItem } from "@/components/travellers/TravellersListItem/TravellersListItem";
import { Traveller } from "@/types/traveller.types";



export default function TravellersList({ items }: { items: Traveller[] }) {
  return (
    <div className={css.wrap}>
      {/* t = traveller */}
      <div className={css.grid}>
        {items.map((t) => (
          <TravellersListItem
            key={t.id}
            id={t.id}
            name={t.name}
            bio={t.bio}
            avatar={t.avatar}
          />
        ))}
      </div>

    </div>
  );
}
