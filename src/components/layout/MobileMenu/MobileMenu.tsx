"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  isAuthenticated: boolean;
  user?: { name: string; avatar: string } | null;
  onLogout: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  isAuthenticated,
  user,
  onLogout,
}: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Закрити меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {isAuthenticated && user && (
          <div className={styles.userInfo}>
            <img
              src={user.avatar || "/images/default-avatar.png"}
              alt={user.name}
              className={styles.avatar}
            />
            <span className={styles.userName}>{user.name}</span>
          </div>
        )}

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ""
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          {isAuthenticated ? (
            <button onClick={onLogout} className={styles.logoutBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Вийти
            </button>
          ) : (
            <div className={styles.authLinks}>
              <Link
                href="/auth/login"
                className={styles.loginLink}
                onClick={onClose}
              >
                Вхід
              </Link>
              <Link
                href="/auth/register"
                className={styles.registerLink}
                onClick={onClose}
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
