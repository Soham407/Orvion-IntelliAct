"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home", variant: "home" },
  { 
    href: "/solutions", 
    label: "Solutions", 
    variant: "solutions",
    dropdown: [
      { href: "/solutions/refinery-terminals", label: "Refinery & Terminals" },
      { href: "/solutions/power-warehouse", label: "Power & Energy" },
      { href: "/solutions/chemical-pharma", label: "Chemical & Pharma" },
      { href: "/solutions/water-scada", label: "Water SCADA" },
      { href: "/solutions/compressor-control-system", label: "Compressor Control" },
      { href: "/solutions/machine-monitoring", label: "Machine Monitoring" },
      { href: "/solutions/optimization-solutions", label: "Process Optimization" },
      { href: "/solutions/cloud-solutions", label: "Cloud Solutions" },
    ]
  },
  { 
    href: "/products", 
    label: "Products", 
    variant: "products",
    dropdown: [
      { href: "/products/control-safety-system", label: "Control Systems" },
      { href: "/products/field-instruments", label: "Field Instruments" },
      { href: "/products/flow-level-instruments", label: "Flow & Level" },
      { href: "/products/fire-alarm-system", label: "Fire Alarm & Safety" },
      { href: "/products/advanced-layer", label: "Advanced Layer (APL)" },
      { href: "/products/analyser", label: "Industrial Analysers" },
      { href: "/products/gas-detector", label: "Gas Detection" },
      { href: "/products/electrical", label: "Electrical & Switchgear" },
      { href: "/products/software", label: "Software & IIoT" },
    ]
  },
  {
    href: "/company/about-us",
    label: "Company",
    variant: "company",
    dropdown: [
      { href: "/company/about-us", label: "About Us" },
      { href: "/company/company-profile", label: "Company Profile" },
      { href: "/company/vision-mission", label: "Vision & Mission" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/company/why-intelliact", label: "Why Choose Us" },
      { href: "/company/certification", label: "Certifications" },
      { href: "/company/quality-policy", label: "Quality Policy" },
      { href: "/company/hse-policy", label: "HSE Policy" },
      { href: "/company/careers", label: "Careers" },
    ]
  }
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

    handleScroll();
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
      className={`site-header legacy-nav ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
    >
      <div className="shell header-inner">
        <Link href="/" className="brand-mark" onClick={() => setIsOpen(false)}>
          <Image
            src="/OIAPL Logo - MASTER CTC.svg"
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
                className={`nav-link nav-link-${item.variant} ${pathname === item.href || (item.dropdown && item.dropdown.some(sub => pathname === sub.href)) ? "active" : ""}`}
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
          <Link href="/employee-portal" className="nav-login">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Login
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
                  className={`mobile-nav-link mobile-nav-link-${item.variant} ${pathname === item.href || (item.dropdown && item.dropdown.some(sub => pathname === sub.href)) ? "active" : ""}`}
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
                  <div>
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
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
          <Link href="/employee-portal" className="mobile-login" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Employee Login
          </Link>
        </nav>
      </div>

    </header>
  );
}
