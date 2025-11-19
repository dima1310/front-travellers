"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { useModal } from "@/hooks/useModal";

import pageStyles from "@/app/Home.module.css";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";

  const { user, isAuthenticated, logout } = useAuthStore();
  const logoutModal = useModal();

  const [menuOpen, setMenuOpen] = useState(false);

  const commonNav = [
    { label: "Головна", href: ROUTES.HOME },
    { label: "Історії", href: ROUTES.STORIES },
    { label: "Мандрівники", href: "/travellers" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogoutClick = () => {
    logoutModal.onOpen();
    closeMenu();
  };

  const confirmLogout = () => {
    logout();
    logoutModal.onClose();
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerClassName = [
    styles.header,
    isHomePage ? styles.headerTransparent : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenuClassName = [
    styles.mobileMenu,
    menuOpen ? styles.mobileMenuOpen : "",
    isHomePage ? styles.mobileMenuTransparent : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* ===== DESKTOP / TABLET HEADER ===== */}
      <header className={headerClassName}>
        <div className={`${pageStyles.container} ${styles.headerContainer}`}>
          {/* logo */}
          <Link
            href={ROUTES.HOME}
            className={styles.headerLinkLogo}
            onClick={closeMenu}
          >
            <div className={styles.logoIconWrapper}>
              <svg className={styles.logoIcon} width={23} height={23}>
                {/* если у тебя спрайт, меняешь href на свой id */}
                <use href="/icons/plantain.svg" />
              </svg>
            </div>
            <span className={styles.logoText}>Подорожники</span>
          </Link>

          <div className={styles.navAndControls}>
            {/* основная навигация (видна только ≥1440px) */}
            <nav aria-label="Основна навігація" className={styles.navigation}>
              <ul className={styles.navList}>
                {commonNav.map((item) => (
                  <li key={item.href} className={styles.navItem}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}

                {isAuthenticated && (
                  <li className={styles.navItem}>
                    <Link href="/profile" className={styles.navLink}>
                      Мій профіль
                    </Link>
                  </li>
                )}
              </ul>

              <ul className={styles.profileActions}>
                {isAuthenticated ? (
                  <>
                    <li className={styles.publishItem}>
                      <Link
                        href="/stories/create"
                        className={styles.storyTabletLink}
                      >
                        Опублікувати історію
                      </Link>
                    </li>

                    <li className={styles.userItem}>
                      <div className={styles.user}>
                        <Image
                          src={
                            user?.avatar || "/public/images/Avatar Image.png"
                          }
                          alt={user?.name || "User avatar"}
                          width={32}
                          height={32}
                          className={styles.userAvatar}
                        />
                        <span className={styles.userName}>
                          {user?.name || "Мандрівник"}
                        </span>
                      </div>
                    </li>

                    <li className={styles.logoutItem}>
                      <button
                        type="button"
                        className={styles.logoutButton}
                        onClick={handleLogoutClick}
                        aria-label="Вийти з акаунту"
                      >
                        <svg width={24} height={24}>
                          <use href="/icons/exit.svg" />
                        </svg>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className={styles.authItem}>
                      <Link
                        href={ROUTES.AUTH.LOGIN}
                        className={`${styles.authBtn} ${styles.authBtnOutline}`}
                      >
                        Вхід
                      </Link>
                    </li>
                    <li className={styles.authItem}>
                      <Link
                        href={ROUTES.AUTH.REGISTER}
                        className={`${styles.authBtn} ${styles.authBtnFilled}`}
                      >
                        Реєстрація
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* бургер – виден на мобиле и планшете */}
            <button
              type="button"
              className={`${styles.mobileMenuButtonBase} ${
                isHomePage
                  ? `${styles.mobileMenuButtonTransparent} ${styles.mobileMenuButtonNoTransparent}`
                  : styles.mobileMenuButtonNoTransparent
              } ${styles.mobileMenuButton}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              <span
                className={`${styles.burgerLines} ${
                  menuOpen ? styles.burgerActive : ""
                }`}
              >
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE FULLSCREEN MENU ===== */}
      {menuOpen && (
        <div className={mobileMenuClassName}>
          <div className={styles.mobileHeaderRow}>
            <Link
              href={ROUTES.HOME}
              className={styles.headerLinkLogo}
              onClick={closeMenu}
            >
              <div className={styles.logoIconWrapper}>
                <svg className={styles.logoIcon} width={23} height={23}>
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
              </div>
            </Link>

            <button
              type="button"
              className={styles.mobileCloseButton}
              onClick={toggleMenu}
              aria-label="Закрити меню"
            >
              <span className={`${styles.burgerLines} ${styles.burgerActive}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          {isAuthenticated && (
            <div className={styles.mobileUser}>
              <Image
                src={user?.avatar || "/public/images/Avatar Image.png"}
                alt={user?.name || "User avatar"}
                width={40}
                height={40}
                className={styles.userAvatar}
              />
              <span className={styles.userName}>
                {user?.name || "Мандрівник"}
              </span>
            </div>
          )}

          <nav aria-label="Мобільна навігація" className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {commonNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className={styles.mobileNavLink}
                      onClick={closeMenu}
                    >
                      Мій профіль
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stories/create"
                      className={`${styles.mobileNavLink} ${styles.mobilePublish}`}
                      onClick={closeMenu}
                    >
                      Опублікувати історію
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`${styles.mobileNavLink} ${styles.mobileLogout}`}
                      onClick={handleLogoutClick}
                    >
                      Вийти
                    </button>
                  </li>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <li>
                    <Link
                      href={ROUTES.AUTH.LOGIN}
                      className={styles.mobileNavLink}
                      onClick={closeMenu}
                    >
                      Вхід
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.AUTH.REGISTER}
                      className={styles.mobileNavLink}
                      onClick={closeMenu}
                    >
                      Реєстрація
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}

      {/* ===== LOGOUT MODAL ===== */}
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
