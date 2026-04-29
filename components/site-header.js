"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { href: "/", label: "Home", variant: "home" },
  { href: "/solutions", label: "Solutions", variant: "solutions" },
  { href: "/products", label: "Products", variant: "products" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navMode, setNavMode] = useState("current");
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
    const savedNavMode = window.localStorage.getItem("nav-preview-mode");

    if (savedNavMode === "original") {
      setNavMode("original");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("nav-preview-mode", navMode);
  }, [navMode]);

  const toggleDropdown = (label) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const toggleNavMode = () => {
    setNavMode((currentMode) => (currentMode === "current" ? "original" : "current"));
  };

  return (
    <header 
      className={`site-header ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""} ${navMode === "original" ? "legacy-nav" : ""}`}
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
                className={`nav-link nav-link-${item.variant} ${pathname === item.href ? "active" : ""}`}
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
                  className={`mobile-nav-link mobile-nav-link-${item.variant} ${pathname === item.href ? "active" : ""}`}
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

      {mounted ? createPortal(
        <button
          type="button"
          className={`nav-preview-toggle ${navMode === "original" ? "legacy" : ""}`}
          aria-pressed={navMode === "original"}
          onClick={toggleNavMode}
        >
          {navMode === "original" ? "Option 1" : "Option 2"}
        </button>,
        document.body
      ) : null}
    </header>
  );
}
