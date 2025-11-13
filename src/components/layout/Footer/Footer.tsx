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
        <div className={styles.logoSection}>
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

          <p className={styles.copy}>
            © 2025 Подорожники. Усі права захищені.
          </p>
        </div>

        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={styles.linkBtn}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                <Image src={s.icon} alt={s.label} width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
