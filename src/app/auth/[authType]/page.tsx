// import Link from "next/link";
// import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
// import LoginForm from "@/components/forms/LoginForm/LoginForm";

// type AuthParams = {
//   authType?: string;
// };

// export default async function AuthPage({
//   params,
// }: {
//   params: Promise<AuthParams>;
// }) {
//   const { authType } = await params;

//   const mode = authType === "login" ? "login" : "register";

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <section style={{ width: "100%", maxWidth: 960 }}>
//         {/* Табы "Реєстрація / Вхід" как в макете */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 80,
//             marginBottom: 32,
//             borderBottom: "1px solid #e5e7eb",
//           }}
//         >
//           <Link
//             href="/auth/register"
//             style={{
//               paddingBottom: 8,
//               fontWeight: 600,
//               borderBottom:
//                 mode === "register"
//                   ? "3px solid #2563eb"
//                   : "3px solid transparent",
//               color: mode === "register" ? "#111827" : "#6b7280",
//             }}
//           >
//             Реєстрація
//           </Link>
//           <Link
//             href="/auth/login"
//             style={{
//               paddingBottom: 8,
//               fontWeight: 600,
//               borderBottom:
//                 mode === "login"
//                   ? "3px solid #2563eb"
//                   : "3px solid transparent",
//               color: mode === "login" ? "#111827" : "#6b7280",
//             }}
//           >
//             Вхід
//           </Link>
//         </div>

//         {/* Вставляем одну из форм */}
//         {mode === "register" ? <RegistrationForm /> : <LoginForm />}
//       </section>
//     </main>
//   );
// }
// app/auth/[authType]/page.tsx
import Link from "next/link";
import styles from "./AuthPage.module.css";
import LoginForm from "@/components/forms/LoginForm/LoginForm";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";

type Props = {
  params: { authType: string };
};

export default function AuthPage({ params }: Props) {
  const { authType } = params;

  const current =
    authType === "login" || authType === "register" ? authType : "login";

  return (
    <section className={styles.authBgc}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <ul className={styles.nav}>
            <li>
              <Link
                href="/auth/register"
                className={`${styles.tab} ${
                  current === "register" ? styles.active : ""
                }`}
              >
                Реєстрація
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className={`${styles.tab} ${
                  current === "login" ? styles.active : ""
                }`}
              >
                Вхід
              </Link>
            </li>
          </ul>

          {current === "register" ? <RegistrationForm /> : <LoginForm />}

          <div className={styles.copy}>
            <p>© 2025 Подорожники. Усі права захищені.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
