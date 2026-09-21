"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

const links = [
  { href: "/menus/", label: "Menus" },
  { href: "/restaurants/", label: "Our restaurants" },
  { href: "/about/", label: "Our story" },
  { href: "/catering/", label: "Catering & events" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    if (open) document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="site-header">
    <div className="header-inner">
      <Link className="wordmark" href="/" aria-label="Natural Kitchen home" onClick={() => setOpen(false)}>
        NATURAL KITCHEN<span>LONDON</span>
      </Link>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/book/" className="button button-small" onClick={() => setOpen(false)}>Book a table <Arrow /></Link>
        <button className="nav-toggle" ref={toggleRef} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          <span className={open ? "menu-lines is-open" : "menu-lines"}><i /><i /></span>
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
      {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}<Arrow /></Link>)}
    </nav>
  </header>;
}
