import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Wafy | Frontend Developer",
  description:
    "Frontend Developer specializing in React, Next.js & TypeScript. Building clean, modern, and performant web experiences.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Ahmed Wafy",
    "Portfolio",
  ],
  authors: [{ name: "Ahmed Wafy" }],
  openGraph: {
    title: "Ahmed Wafy | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js & TypeScript. Building clean, modern web experiences.",
    url: "https://your-domain.vercel.app", // Change it After Deploy
    siteName: "Ahmed Wafy Portfolio",
    images: [
      {
        url: "/og-image.jpg", //  1200x630
        width: 1200,
        height: 630,
        alt: "Ahmed Wafy - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Wafy | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js & TypeScript.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
