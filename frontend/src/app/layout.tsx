import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/custom/Navbar";
import FooterSection from "@/components/custom/footerSection";
import ContactWidget from "@/components/custom/contactWidget";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pivotsafe.com";
const SITE_NAME = "PivotSafe";
const SITE_DESCRIPTION =
  "PivotSafe — adversary simulation, red team operations, application security, ICS/SCADA security, and AI red teaming. Pivot to a proactive layer of security.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Pivot to a Proactive Layer of Security`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  keywords: [
    "PivotSafe",
    "red team",
    "adversary simulation",
    "penetration testing",
    "application security",
    "ICS security",
    "SCADA security",
    "AI red teaming",
    "MITRE ATLAS",
    "offensive security",
  ],
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Pivot to a Proactive Layer of Security`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Pivot to a Proactive Layer of Security`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-[#0f0f0f]"}>
        <header>
          <Navbar />
        </header>
        {children}
        <ContactWidget />
        <footer>
          <FooterSection />
        </footer>
      </body>
    </html>
  );
}
