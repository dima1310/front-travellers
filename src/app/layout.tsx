import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ReduxProvider from "@/providers/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
    <html lang="en">{/* при желании замени на "uk" */}
      <body>
        <ReduxProvider>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
