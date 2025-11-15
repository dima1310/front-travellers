"use client";

import styles from "./StoriesTabs.module.css";

interface Props {
  activeTab: "saved" | "created";
  onChange: (tab: "saved" | "created") => void;
}

export default function StoriesTabs({ activeTab, onChange }: Props) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "saved" ? styles.active : ""}`}
        onClick={() => onChange("saved")}
      >
        Збережені історії
      </button>

      <button
        className={`${styles.tab} ${activeTab === "created" ? styles.active : ""}`}
        onClick={() => onChange("created")}
      >
        Мої історії
      </button>
    </div>
  );
}
