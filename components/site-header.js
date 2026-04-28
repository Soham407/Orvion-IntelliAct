"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { 
    href: "/solutions", 
    label: "Solutions",
    dropdown: [
      { href: "/solutions/refinery-terminals", label: "Refinery & Terminals" },
      { href: "/solutions/power-warehouse", label: "Power & Energy" },
      { href: "/solutions/chemical-pharma", label: "Chemical & Pharma" },
      { href: "/solutions/water-scada", label: "Water SCADA" },
      { href: "/solutions/compressor-control-system", label: "Compressor Control" },
    ]
  },
  { 
    href: "/#products", 
    label: "Products",
    dropdown: [
      { href: "/products/control-safety-system", label: "Control Systems" },
      { href: "/products/field-instruments", label: "Field Instruments" },
      { href: "/products/flow-level-instruments", label: "Flow & Level" },
      { href: "/products/analyser", label: "Analysers" },
      { href: "/products/electrical", label: "Electrical" },
    ]
  },
  { 
    href: "/company/about-us", 
    label: "Company",
    dropdown: [
      { href: "/company/about-us", label: "About Us" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/company/why-intelliact", label: "Why IntelliAct" },
      { href: "/company/quality-policy", label: "Quality Policy" },
      { href: "/company/hse-policy", label: "HSE Policy" },
      { href: "/company/careers", label: "Careers" },
    ]
  },
  { href: "/projects", label: "Projects" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="shell header-inner">
        <Link href="/" className="brand-mark" onClick={() => setOpen(false)}>
          <Image
            src="/images/Logo/LOGO.png"
            alt="Orvion IntelliAct Automation"
            width={220}
            height={72}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <div key={item.label} className="nav-item">
              <Link
                href={item.href}
                className={pathname === item.href ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="dropdown-menu">
                  {item.dropdown.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} className="dropdown-link">
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="nav-cta">
            Contact Us
          </Link>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <nav className="mobile-nav shell" aria-label="Mobile">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={pathname === item.href ? "nav-link active" : "nav-link"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <Link href="/contact" className="nav-link accent-link" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
