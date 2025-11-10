import Link from "next/link";
import css from "./buttonProfile.module.css";

export default function ButtonProfile({id}: {id:string}) {
    return(
      <Link href={`/travellers/${id}`} className={css.buttonProfile}> 
      Переглянути профіль
    </Link>
    );
   };   
   
