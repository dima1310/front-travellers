"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
// import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import logo from "../../../../public/icons/logo.svg";
import exit from "../../../../public/icons/exit.svg"
import avatarimg from "../../../../public/images/avatarimg.png";
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
      ];

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
          <Image
            src={logo}
            width={19}
            height={22}
            alt="Logo Podorozhnyky"
          />
          <span className={styles.logoText}>Подорожники</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
             </li>
            ))}
          </ul>
          
          <div className={styles.action}>
            <Link href="/new-story" className={styles.publishBtn} onClick={closeMenu}>
              Опублікувати історію
            </Link>
            
            
              <div className={styles.profile}>
                <Image
                  src={user?.avatar || avatarimg }
                  alt={user?.name || "User avatar"}
                  width={24}
                  height={24}
                />
              <span className={styles.userName}>{user?.name || "Ім'я"}</span>
              <span className={styles.line}></span>
                <button
                  type="button"
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                <Image
                  className={styles.exitIcon}
                  src={exit}
                  width={32}
                  height={32}
                  alt="Logout button"
                />
              </button>
              
        {/* Burger tab + mobile */}
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
          </div>
        </nav>
      </div>
    </header>


  );
}