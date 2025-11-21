"use client";

import {useQuery} from "@tanstack/react-query";
import styles from "./TravellerInfo.module.css";
import {getTravellerById} from "@/services/api/travellersApi";
import {Avatar} from "../Avatar/Avatar";

interface TravellerInfoProps {
    id: string;
}

export default function TravellerInfo({id}: TravellerInfoProps) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["traveller", id],
        queryFn: () => getTravellerById(id),
    });

    if (isLoading) {
        return <p className={styles.loading}>Завантаження...</p>;
    }

    if (isError || !data) {
        return <p className={styles.error}>Помилка завантаження профілю.</p>;
    }

    const {name, avatar, bio} = data as {
        name: string;
        avatar?: string;
        bio?: string;
    };

    return (
        <div className={styles.profile}>
            <Avatar src={avatar} name={name}/>

            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.bio}>
                    {bio || "Мандрівник поки не додав опис."}
                </p>
            </div>
        </div>
    );
}
