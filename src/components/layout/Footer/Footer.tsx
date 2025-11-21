import Image from "next/image";
import css from "./Footer.module.css";
import Link from "next/link";
import mainCss from "@/app/Home.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={mainCss.container}>
                <div className={css.wrap}>
                    <div className={css.content}>
                        <div className={css.logo}>
                            <Link className={css.logo_link} href="/">
                                <Image
                                    src="/icons/plantain.svg"
                                    alt="Логотип Подорожники"
                                    width={23}
                                    height={23}
                                    className={css.logo_icon}
                                />
                                <p className={css.logo_text}>Подорожники</p>
                            </Link>
                        </div>

                        <div className={css.links}>
                            <ul className={css.links_list}>
                                <li className={css.links_item}>
                                    <Link
                                        className={css.links_icon}
                                        target="_blank"
                                        href="https://www.facebook.com/"
                                        aria-label="Go to Facebook"
                                    >
                                        <Image
                                            src="/icons/Facebook.svg"
                                            alt="Facebook"
                                            width={32}
                                            height={32}
                                            className={css.footer_icon}
                                        />
                                    </Link>
                                </li>

                                <li className={css.links_item}>
                                    <Link
                                        className={css.links_icon}
                                        target="_blank"
                                        href="https://www.instagram.com/"
                                        aria-label="Go to Instagram"
                                    >
                                        <Image
                                            src="/icons/Instagram.svg"
                                            alt="Instagram"
                                            width={32}
                                            height={32}
                                            className={css.footer_icon}
                                        />
                                    </Link>
                                </li>

                                <li className={css.links_item}>
                                    <Link
                                        className={css.links_icon}
                                        target="_blank"
                                        href="https://x.com/"
                                        aria-label="Go to X"
                                    >
                                        <Image
                                            src="/icons/X.svg"
                                            alt="X"
                                            width={32}
                                            height={32}
                                            className={css.footer_icon}
                                        />
                                    </Link>
                                </li>

                                <li className={css.links_item}>
                                    <Link
                                        className={css.links_icon}
                                        target="_blank"
                                        href="https://www.youtube.com/"
                                        aria-label="Go to YouTube"
                                    >
                                        <Image
                                            src="/icons/Youtube.svg"
                                            alt="YouTube"
                                            width={32}
                                            height={32}
                                            className={css.footer_icon}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <nav className={css.nav}>
                        <ul className={css.nav_list}>
                            <li className={css.nav_item}>
                                <Link className={css.nav_link} href="/">
                                    Головна
                                </Link>
                            </li>
                            <li className={css.nav_item}>
                                <Link className={css.nav_link} href="/stories">
                                    Історії
                                </Link>
                            </li>
                            <li className={css.nav_item}>
                                <Link className={css.nav_link} href="/travellers">
                                    Мандрівники
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={css.inscription}>
                    <p className={css.text}>© 2025 Подорожники. Усі права захищені.</p>
                </div>
            </div>
        </footer>
    );
}
