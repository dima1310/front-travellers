"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./Header.module.css";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { useModal } from "@/hooks/useModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const logoutModal = useModal();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navItems = isAuthenticated
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

  const handleLogout = () => {
    logoutModal.onOpen();
    closeMenu();
  };

  const confirmLogout = () => {
    logout();
    logoutModal.onClose();
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
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

          {isAuthenticated ? (
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
          ) : (
            <div className={styles.authLinks}>
              <Link href={ROUTES.AUTH.LOGIN} onClick={closeMenu}>
                Вхід
              </Link>
              <Link
                href={ROUTES.AUTH.REGISTER}
                className={styles.register}
                onClick={closeMenu}
              >
                Реєстрація
              </Link>
            </div>
          )}
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
    {logoutModal.open && (
      <ConfirmModal
          title="Ви точно хочете вийти?"
          text="Ми будемо сумувати за вами!"
          cancelButtonText="Відмінити"
          confirmButtonText="Вийти"
          onCancel={logoutModal.onClose}
          onConfirm={confirmLogout}
        />
      )}
    </>
  );
}
