import HomeStyles from "@/app/Home.module.css";
import styles from "./About.module.css";

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={`container ${styles.inner}`}>
                    <div className={styles.content}>
                        <div className={styles.aboutWrapper}>
                            <div className={styles.titleBlock}>
                                <h2 className={styles.title}>
                                    Проєкт, створений для тих, <br/>
                                    хто живе подорожами
                                </h2>
                            </div>

                            <p className={styles.description}>
                                Ми віримо, що кожна подорож — це унікальна історія,
                                варта того, щоб нею поділилися. Наша платформа створена,
                                щоб об'єднати людей, закоханих у відкриття нового. Тут ви
                                можете ділитися власним досвідом, знаходити друзів та
                                надихатися на наступні пригоди разом з нами.
                            </p>
                        </div>
                        <div className={styles.features}>
                            {/* 1 */}
                            <div className={styles.featureItem}>
                                <img src="/icons/Icon1.svg" className={styles.icon} alt=""/>
                                <h3 className={styles.featureTitle}>Наша місія</h3>
                                <p className={styles.featureText}>
                                    Об’єднувати людей через любов до пригод та надихати на нові
                                    відкриття.
                                </p>
                            </div>

                            {/* 2 */}
                            <div className={styles.featureItem}>
                                <img src="/icons/Icon2.svg" className={styles.icon} alt=""/>
                                <h3 className={styles.featureTitle}>Автентичні історії</h3>
                                <p className={styles.featureText}>
                                    Ми цінуємо справжні, непереглянуті враження мандрівників з
                                    усього світу.
                                </p>
                            </div>

                            {/* 3 */}
                            <div className={styles.featureItem}>
                                <img src="/icons/Vector3.svg" className={styles.icon} alt=""/>
                                <h3 className={styles.featureTitle}>Ваша спільнота</h3>
                                <p className={styles.featureText}>
                                    Станьте частиною спільноти, де кожен може бути і автором, і
                                    читачем.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}