import React from "react";
import css from "./TravellersListItem.module.css";
import ButtonProfile from "@/components/ui/Button/ButtonProfile/buttonProfile";
import { Traveller } from "@/types/traveller.types";
type Props = Traveller;

export const TravellersListItem = ({id, name, bio, avatar}: Props) => {
     //src для <img>, чтобы не передавать пустую строку в src
  const avatarSrc =
    avatar && avatar.trim() !== "" ? avatar : "/icons/user.svg"; 
return(
<div className={css.card}>
      {/* используем avatarSrc вместо avatar */}
    <img src={avatarSrc}  alt ={name} className={css.avatar}/>
    <h3 className={css.name}>{name}</h3>
    <p className={css.text}>{bio}</p>

    <ButtonProfile id={id}/>

</div>
);
};
