"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BagIcon, CloseIcon, MenuIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About us" },
  { href: "/become-a-distributor", label: "Distribute" },
  { href: "/work-with-us", label: "Work with us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>Complimentary delivery above ₹2,999</span>
        <span className="announcementDot" />
        <span>Private launch edit now live</span>
      </div>
      <header className="siteHeader">
        <Link className="brand" href="/" aria-label="Luca Brasi International home">
          <span className="brandMark">LB</span>
          <span className="brandWords">
            <strong>Luca Brasi</strong>
            <small>International</small>
          </span>
        </Link>

        <nav className="desktopNav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              className={pathname === link.href ? "active" : ""}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions">
          <Link className="iconButton" href="/checkout" aria-label="View bag">
            <BagIcon />
            <span className="bagCount">0</span>
          </Link>
          <button
            className="iconButton menuButton"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {open && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <span>↗</span>
            </Link>
          ))}
          <Link className="mobileAdminLink" href="/admin/pricing" onClick={() => setOpen(false)}>
            Pricing administration
          </Link>
        </nav>
      )}
    </>
  );
}
