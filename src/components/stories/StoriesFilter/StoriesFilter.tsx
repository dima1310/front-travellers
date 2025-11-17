"use client";

import styles from "./StoriesFilter.module.css";

export type StoriesFilterValue =
    | "all"
    | "europe"
    | "asia"
    | "africa"
    | "desert"
    | "other"; // підлаштуй під реальні категорії з бекенду

type CategoryConfig = {
    value: StoriesFilterValue;
    label: string;
};

// тексти й порядок — як у Figma (підстав свої точні назви)
const CATEGORIES: CategoryConfig[] = [
    { value: "all", label: "Всі історії" },
    { value: "europe", label: "Європа" },
    { value: "asia", label: "Азія" },
    { value: "desert", label: "Пустелі" },
    { value: "africa", label: "Африка" },
];

type Props = {
    value: StoriesFilterValue;
    onChange: (value: StoriesFilterValue) => void;
};

export default function StoriesFilter({ value, onChange }: Props) {
    const handleClick = (val: StoriesFilterValue) => {
        if (val === value) return;
        onChange(val);
    };

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        onChange(e.target.value as StoriesFilterValue);
    };

    return (
        <div className={styles.wrapper}>
            {/* Desktop / tablet: таби */}
            <div className={styles.tabs} aria-label="Фільтр за категоріями">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        type="button"
                        className={`${styles.tab} ${
                            value === cat.value ? styles.tabActive : ""
                        }`}
                        onClick={() => handleClick(cat.value)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Mobile: select */}
            <div className={styles.selectWrapper}>
                <select
                    className={styles.select}
                    value={value}
                    onChange={handleSelectChange}
                    aria-label="Фільтр за категоріями"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}