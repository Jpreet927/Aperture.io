import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/nav/footer";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/providers/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Aperture.io",
    description:
        "A place where photographers can share their magnificent creations.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
