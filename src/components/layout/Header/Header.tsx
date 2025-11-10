"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import styles from "./Header.module.css";

export default function Header() {
  const { isAuth, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((p) => !p);

  const closeMenu = () => setMenuOpen(false);

  const navItems = isAuth
    ? [
        { label: "Головна", href: ROUTES.HOME },
        { label: "Історії", href: ROUTES.STORIES },
        { label: "Мандрівники", href: "/travellers" },
        { label: "Мій Профіль", href: ROUTES.AUTH.PROFILE },
        { label: "Опублікувати історію", href: "/new-story" },
      ]
    : [
        { label: "Головна", href: ROUTES.HOME },
        { label: "Історії", href: ROUTES.STORIES },
        { label: "Мандрівники", href: "/travellers" },
      ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 8l-8-4 8-4 8 4-8 4zM2 17l10 5 10-5v-2l-10 5-10-5v2z" />
          </svg>
          Подорожники
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {isAuth ? (
            <div className={styles.user}>
              <img src={user?.avatarUrl || "/avatar.svg"} alt={user?.name} />
              <span>{user?.name}</span>
              <button className={styles.logoutBtn}>⟶</button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href={ROUTES.AUTH.LOGIN}>Вхід</Link>
              <Link href={ROUTES.AUTH.REGISTER} className={styles.register}>
                Реєстрація
              </Link>
            </div>
          )}
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
