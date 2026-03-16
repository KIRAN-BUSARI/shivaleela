import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivaleela Natyalaya",
  description: "Shivaleela Natyalaya is a premier dance academy in Bangalore, specializing in Bharatanatyam. We nurture talent with expert training, fostering creativity and cultural appreciation. Join us to experience the transformative power of dance and celebrate India's rich heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${lato.variable} antialiased overflow-hidden`}
      >
        {process.env.NODE_ENV === "production" && <Analytics />}
        {children}
      </body>
    </html>
  );
}
