import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeEngine } from "@/components/theme-engine";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Luca Brasi International | Modern menswear",
    template: "%s | Luca Brasi International",
  },
  description:
    "Premium men's leather shoes, tailoring and elevated essentials from Luca Brasi International.",
  openGraph: {
    title: "Luca Brasi International",
    description: "Quiet confidence, beautifully made.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07162f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname.indexOf('/admin')===0)return;var t=localStorage.getItem('lbi-store-theme-v1')||'royal-heritage';document.documentElement.dataset.theme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ThemeEngine />
      </body>
    </html>
  );
}
