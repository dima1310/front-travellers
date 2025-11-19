import "./globals.css";
import "./reset.css";
import type { Metadata } from "next";
import ReduxProvider from "@/providers/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

import { Nunito_Sans, Sora, Unbounded } from "next/font/google";

// === Шрифты ===

const nunito = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

// === Metadata ===

export const metadata: Metadata = {
  title: {
    default: "Front Travellers",
    template: "%s | Front Travellers",
  },
  description:
    "Проєкт «Подорожники» — Travel App, створений для тих, хто живе подорожами (Next.js, Redux Toolkit, React Query).",
  icons: {
    icon: "/icons/logo.svg",
  },
};

// === Root Layout ===

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${nunito.variable} ${sora.variable} ${unbounded.variable}`}
    >
      <body>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
