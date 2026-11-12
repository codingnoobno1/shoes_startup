"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <div>
          <Image className="footerLogo" src="/brand/luca-brasi-monogram.svg" alt="Luca Brasi International" width={72} height={72} />
          <span className="eyebrow">Luca Brasi International</span>
          <h2>Quiet confidence,<br />beautifully made.</h2>
        </div>
        <div className="footerLinks">
          <div>
            <h3>Explore</h3>
            <Link href="/">Shop the edit</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/shipping">Pan-India delivery</Link>
          </div>
          <div>
            <h3>Partner</h3>
            <Link href="/become-a-distributor">Become a distributor</Link>
            <Link href="/work-with-us">Work with us</Link>
            <Link href="/admin">Admin demo</Link>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <address>218, Lakshmi Garden, Yamuna Nagar, Haryana</address>
        <a href="mailto:lucabrasiinternational@gmail.com">
          lucabrasiinternational@gmail.com
        </a>
        <span>© {new Date().getFullYear()} Luca Brasi International</span>
      </div>
    </footer>
  );
}
