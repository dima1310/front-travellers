"use client";

import HomeStyles from "@/app/Home.module.css";
import css from "./TravellersList.module.css";
import { TravellersListItem } from "@/components/travellers/TravellersListItem/TravellersListItem";
import type { Traveller } from "@/types/traveller.types";

interface Props {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: Props) {
  return (
    <section className={css.section}>
      <div className={HomeStyles.container}>
        <div className={`container ${css.inner}`}>
          <div className={css.list}>
            {travellers.map((t) => (
              <TravellersListItem
                key={t._id}
                _id={t._id}
                name={t.name}
                bio={t.bio}
                avatar={t.avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

