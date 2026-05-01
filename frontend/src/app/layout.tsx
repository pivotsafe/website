import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/custom/Navbar";
import FooterSection from "@/components/custom/footerSection";
import ContactWidget from "@/components/custom/contactWidget";
import Head from "next/head";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pivot Safe",
  description: "Pivot to Proactive Layer of Security",
  icons: {
    icon: "/icon.ico",
  },
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
        {/* <div className="custom-container m-auto">{children}</div> */}
      </body>
    </html>
  );
}
