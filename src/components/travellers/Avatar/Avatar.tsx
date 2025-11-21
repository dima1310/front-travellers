import Image from "next/image";
import {useState} from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
    src?: string | null;
    name?: string;
}

// My approach - all logic in ONE place (Avatar component)
export function Avatar({src, name}: AvatarProps) {
    const [imageError, setImageError] = useState(false);
    const hasValidSrc = src && src.trim() !== "";

    // No valid src OR image failed to load = show placeholder
    if (!hasValidSrc || imageError) {
        // If name exists, show first letter
        if (name && name.trim() !== "") {
            const firstLetter = name.charAt(0).toUpperCase();

            return (
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarPlaceholder}>
                        <span className={styles.avatarLetter}>{firstLetter}</span>
                    </div>
                </div>
            );
        }

        // If no name, show SVG icon
        return (
            <div className={styles.avatarWrapper}>
                <div className={styles.avatarPlaceholder}>
                    <Image
                        src="/icons/avatar.svg"
                        alt="Avatar"
                        width={199}
                        height={199}
                    />
                </div>
            </div>
        );
    }

    // Valid src = try to load image
    return (
        <div className={styles.avatarWrapper}>
            <Image
                src={src}
                alt={name || "Avatar"}
                width={199}
                height={199}
                className={styles.avatar}
                onError={() => setImageError(true)} // If fails, switch to placeholder
            />
        </div>
    );
}
