"use client";

import { useRouter } from "next/navigation";
import styles from "./MessageNoStories.module.css";

interface MessageNoStoriesProps {
  text: string;
  buttonText: string;
  redirectTo?: string;
}

export default function MessageNoStories({
  text,
  buttonText,
  redirectTo = "/stories",
}: MessageNoStoriesProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo);
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <p className={styles.text}>{text}</p>

        <button type="button" onClick={handleClick} className={styles.button}>
          {buttonText}
        </button>
      </div>
    </section>
  );
}
