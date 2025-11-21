"use client";

import css from "./TravellersList.module.css";
import { TravellersListItem } from "@/components/travellers/TravellersListItem/TravellersListItem";
import type { Traveller } from "@/types/traveller.types";

interface Props {
    travellers: Traveller[];
}

export default function TravellersList({ travellers }: Props) {
    return (
        <div className={css.wrap}>
            <div className={css.grid}>
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
    );
}
