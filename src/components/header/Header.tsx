"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { useModal } from "@/hooks/useModal";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const logoutModal = useModal();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Головна", href: ROUTES.HOME },
    { label: "Історії", href: ROUTES.STORIES },
    { label: "Мандрівники", href: ROUTES.TRAVELLERS },
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
          {/* ЛОГО */}
          <Link href={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
            <Image
              src="/icons/logo.svg"
              alt="Логотип Подорожники"
              width={19}
              height={22}
            />
            <span className={styles.logoText}>Подорожники</span>
          </Link>

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className={styles.rightBlock}>
            {/* КНОПКА "Опублікувати історію" — выключена */}
            {/*
            <Link
              href={ROUTES.STORIES}
              className={styles.publishBtn}
              onClick={closeMenu}
            >
              Опублікувати історію
            </Link>
            */}

            {/* НАВИГАЦИЯ */}
            <nav className={`⁠${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.href} className={styles.navItem}>
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onClick={closeMenu}
                    >
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
                  <Link
                    href={ROUTES.AUTH.LOGIN}
                    className={styles.loginBtn}
                    onClick={closeMenu}
                  >
                    Вхід
                  </Link>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className={styles.registerBtn}
                    onClick={closeMenu}
                  >
                    Реєстрація
                  </Link>
                </div>
              )}
            </nav>

            {/* Бургер */}
            <button
              type="button"
              className={`${styles.burger} ${
                menuOpen ? styles.burgerActive : ""
              }`}
              onClick={toggleMenu}
              aria-label="Відкрити меню"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
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
