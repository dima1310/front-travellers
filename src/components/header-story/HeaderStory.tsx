"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import plantain from "../../../public/icons/plantain.svg";
import styles from "./HeaderStory.module.css";

export default function HeaderStory() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
        { label: "Головна", href: ROUTES.HOME },
        { label: "Історії", href: ROUTES.STORIES },
        { label: "Мандрівники", href: "/travellers" },
        { label: "Мій Профіль", href: ROUTES.AUTH.PROFILE },
        { label: "Опублікувати історію", href: "/new-story" },
    ];

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
          <Image
            src={plantain}
            width={19}
            height={22}
            alt="Plantain"
          />
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

            <div className={styles.user}>
              <Image
                src={user?.avatar || "/avatar.svg"}
                alt={user?.name || "User avatar"}
                width={32}
                height={32}
              />
              <span>{user?.name}</span>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                ⟶
              </button>
            </div>
        </nav>

        <button
          type="button"
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
