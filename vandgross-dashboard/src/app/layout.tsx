import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald"
});

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans"
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-mono"
});

export const metadata: Metadata = {
  title: "VandGross Construction | Budget Control Dashboard",
  description: "Construction budget dashboard with department drill downs and analytics."
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${ibmSans.variable} ${ibmMono.variable}`}
      data-theme="light"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}