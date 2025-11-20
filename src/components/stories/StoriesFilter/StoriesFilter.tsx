"use client";

import React from "react";
import styles from "./StoriesFilter.module.css";
import { useCategories, type Category } from "@/hooks/useCategories";

export type StoriesFilterValue = "all" | string;

type Props = {
  value: StoriesFilterValue;
  onChange: (value: StoriesFilterValue) => void;
};

export default function StoriesFilter({ value, onChange }: Props) {
  const { data: categories, isLoading, error } = useCategories();

  const handleClick = (val: StoriesFilterValue) => {
    if (val === value) return;
    onChange(val);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (isLoading) {
    return <div className={styles.wrapper}>Завантаження категорій…</div>;
  }

  if (error || !categories || categories.length === 0) {
    // Можно показать только "Всі історії", чтобы UI не ломался
    return (
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${value === "all" ? styles.tabActive : ""}`}
            onClick={() => handleClick("all")}
          >
            Всі історії
          </button>
        </div>
      </div>
    );
  }

  const allCategories: (Category | { _id: "all"; name: string })[] = [
    { _id: "all", name: "Всі історії" },
    ...categories,
  ];

  return (
    <div className={styles.wrapper}>
      {/* Desktop / tablet: таби */}
      <div className={styles.tabs} aria-label="Фільтр за категоріями">
        {allCategories.map((cat) => (
          <button
            key={cat._id}
            type="button"
            className={`${styles.tab} ${
              value === (cat._id === "all" ? "all" : cat.name)
                ? styles.tabActive
                : ""
            }`}
            onClick={() => handleClick(cat._id === "all" ? "all" : cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Mobile: select */}
      <div className={styles.selectWrapper}>
        <select
          className={`${styles.select} ${styles.category}`}
          value={value}
          onChange={handleSelectChange}
          aria-label="Фільтр за категоріями"
        >
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id === "all" ? "all" : cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
