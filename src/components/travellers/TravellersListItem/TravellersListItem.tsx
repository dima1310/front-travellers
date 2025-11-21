import React from "react";
import css from "./TravellersListItem.module.css";
import ButtonProfile from "@/components/ui/Button/ButtonProfile/buttonProfile";
import type {Traveller} from "@/types/traveller.types";

type Props = Traveller;

export const TravellersListItem = ({_id, name, bio, avatar}: Props) => {
    // безопасный src: если аватар пустой — показываем заглушку
    const avatarSrc =
        avatar && avatar.trim() !== "" ? avatar : "/icons/user.svg";

    return (
        <article className={css.card}>
            <img className={css.avatar} src={avatarSrc} alt={name}/>

            <h3 className={css.name}>{name}</h3>

            {bio && <p className={css.text}>{bio}</p>}

            <ButtonProfile id={_id}/>
        </article>
    );
};
