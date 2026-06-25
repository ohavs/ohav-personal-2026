import type { Metadata, Viewport } from "next";
import { Heebo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { SITE } from "@/lib/data";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "אוהב — יוצר אפליקציות ואתרים",
  description:
    "אוהב, יוצר דיגיטלי שמעצב ובונה אפליקציות ואתרים שאי אפשר להפסיק להשתמש בהם. עיצוב מוצר, פיתוח Web, מובייל ומיתוג דיגיטלי.",
  keywords: [
    "אוהב",
    "עיצוב מוצר",
    "פיתוח אתרים",
    "אפליקציות מובייל",
    "UI/UX",
    "מיתוג דיגיטלי",
  ],
  authors: [{ name: "אוהב" }],
  openGraph: {
    title: "אוהב — יוצר אפליקציות ואתרים",
    description: SITE.tagline,
    type: "website",
    locale: "he_IL",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${grotesk.variable}`}>
      <body className="grain antialiased">
        <a
          href="#works"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg focus:font-bold"
        >
          דלג לתוכן
        </a>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
