import "./globals.css";
import "@/app/reset.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ReduxProvider from "@/providers/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

//  шрифты
import { Nunito_Sans, Sora } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "Front Travellers",
    template: "%s | Front Travellers",
  },
  description:
    "Проєкт «Подорожники» — Travel App, створений для тих, хто живе подорожами (Next.js, Redux Toolkit, React Query).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${sora.variable}`}>
        <ReduxProvider>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ReduxProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
