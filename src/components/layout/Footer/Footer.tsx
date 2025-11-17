"use client";

import Link from "next/link";
import { ROUTES } from "@/utils/constants/routes";
import styles from "./Footer.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  const navItems = [
    { label: "Головна", href: ROUTES.HOME },
    { label: "Історії", href: ROUTES.STORIES },
    { label: "Мандрівники", href: "/travellers" },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: "/icons/facebook.svg",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: "/icons/instagram.svg",
    },
    { label: "X", href: "https://x.com/", icon: "/icons/x.svg" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: "/icons/youtube.svg",
    },
  ];

  const handleNavClick = (href: string) => {
    if (!isAuth) {
      router.push(ROUTES.AUTH.REGISTER);
      return;
    }
    router.push(href);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ВЕРХНЯЯ СТРОКА */}
        <div className={styles.topRow}>
          {/* Логотип */}
          <Link href={ROUTES.HOME} className={styles.logo}>
            <Image
              src="/icons/logo.svg"
              alt="Логотип Подорожники"
              width={19}
              height={22}
            />
            <span className={styles.logoText}>Подорожники</span>
          </Link>

          {/* Соцсети */}
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <Image src={s.icon} alt={s.label} width={24} height={24} />
                </a>
              </li>
            ))}
          </ul>

          {/* Навигация */}
          <nav>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={styles.linkBtn}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* НИЖНЯЯ СТРОКА — копирайт */}
        <p className={styles.copy}>©️ 2025 Подорожники. Усі права захищені.</p>
      </div>
    </footer>
  );
}
