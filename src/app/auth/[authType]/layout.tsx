import styles from "./AuthPage.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container"></div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
