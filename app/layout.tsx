import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Speech Therapy Demo · Match, Spell & Letters",
  description:
    "Playful demos for vocabulary matching, spelling, letter speaking, and letter tracing — designed for speech therapy, dyslexia support, and early literacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex h-full min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
