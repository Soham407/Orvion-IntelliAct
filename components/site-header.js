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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleDropdown = (label) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <header 
      className={`site-header ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
    >
      <div className="shell header-inner">
        <Link href="/" className="brand-mark" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/Logo/LOGO.png"
            alt="Orvion IntelliAct Automation"
            width={scrolled ? 180 : 220}
            height={scrolled ? 58 : 72}
            className="logo-img"
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <div key={item.label} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.label}
                {item.dropdown && (
                  <svg className="chevron" viewBox="0 0 24 24" width="14" height="14">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>
              {item.dropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    {item.dropdown.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href} className="dropdown-link">
                        <span className="dropdown-label">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
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
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav-overlay ${isOpen ? "visible" : ""}`}>
        <nav className="mobile-nav shell" aria-label="Mobile">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-nav-item">
              <div className="mobile-nav-header">
                <Link
                  href={item.href}
                  className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <button 
                    className={`mobile-dropdown-toggle ${activeDropdown === item.label ? "active" : ""}`}
                    onClick={() => toggleDropdown(item.label)}
                    aria-label={`Toggle ${item.label} dropdown`}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                )}
              </div>
              
              {item.dropdown && (
                <div className={`mobile-dropdown ${activeDropdown === item.label ? "open" : ""}`}>
                  {item.dropdown.map((subItem) => (
                    <Link 
                      key={subItem.href} 
                      href={subItem.href} 
                      className="mobile-dropdown-link"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
