import type {Metadata} from "next";
import "./globals.css";
import {QueryProvider} from "@/src/provider/QueryProvider";
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
    title: "Подорожники",
    description: "Проєкт, створений для тих, хто живе подорожами",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
        <body>
        <QueryProvider>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </QueryProvider>
        </body>
        </html>
    );
}
