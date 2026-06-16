"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CatalogHero } from "../../../components/catalog-hero";
import { DetailContentBrowser } from "../../../components/detail-content-browser";
import { DetailBrowser } from "../../../components/detail-browser";
import { solutions } from "../../../lib/solutions-data";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutions.find((item) => item.slug === slug);
  const mainRef = useRef(null);

  const isChemicalPharma = slug === "chemical-pharma";
  const [pharmaUsername, setPharmaUsername] = useState("");
  const [pharmaPassword, setPharmaPassword] = useState("");
  const [pharmaError, setPharmaError] = useState("");
  const [pharmaLoading, setPharmaLoading] = useState(false);
  const [isPharmaLoggedIn, setIsPharmaLoggedIn] = useState(false);

  useEffect(() => {
    if (isChemicalPharma) {
      const auth = sessionStorage.getItem("oiapl-pharma-auth");
      if (auth === "true") {
        setIsPharmaLoggedIn(true);
      }
    }
  }, [slug, isChemicalPharma]);

  const handlePharmaLoginSubmit = (e) => {
    e.preventDefault();
    setPharmaLoading(true);
    setPharmaError("");

    setTimeout(() => {
      const storedUsers = localStorage.getItem("oiapl-portal-users");
      const users = storedUsers ? JSON.parse(storedUsers) : [
        { username: "employee", password: "1234", role: "employee" },
        { username: "admin", password: "5678", role: "admin" }
      ];

      const found = users.find(
        (u) => u.username.toLowerCase() === pharmaUsername.trim().toLowerCase() && u.password === pharmaPassword
      );

      if (found) {
        sessionStorage.setItem("oiapl-pharma-auth", "true");
        setIsPharmaLoggedIn(true);
      } else {
        setPharmaError("Access denied. Please check your credentials.");
      }
      setPharmaLoading(false);
    }, 700);
  };

  if (!solution) {
    notFound();
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const reveals = mainRef.current?.querySelectorAll(".gs-reveal") ?? [];
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [slug]);

  const isRefineryTerminals = slug === "refinery-terminals";
  const isPowerWarehouse = slug === "power-warehouse";

  const refinerySections = isRefineryTerminals ? solution.content?.sections?.slice(0, 12) : [];
  const terminalSections = isRefineryTerminals ? solution.content?.sections?.slice(12) : [];

  const powerSections = isPowerWarehouse ? solution.content?.sections?.slice(0, 4) : [];
  const warehouseSections = isPowerWarehouse ? solution.content?.sections?.slice(4) : [];

  return (
    <div ref={mainRef} className="solution-detail-page">
      <CatalogHero
        eyebrow="Industrial Solution"
        title={solution.title}
        description={solution.description}
        image={solution.image}
        imageAlt={solution.title}
        stats={[]}
      />

      {isRefineryTerminals ? (
        <>
          <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
            <div className="shell">
              <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
                <div>
                  <span className="accent-bar" />
                  <p className="eyebrow">Division 01</p>
                  <h2>Refinery Solutions</h2>
                </div>
                <p>High-reliability ICSS, process control, and safety automation packages.</p>
              </div>

              <DetailBrowser
                sections={refinerySections}
                kind="Solution"
                searchPlaceholder="Search refinery solutions..."
                panelLabel="Scope and delivery"
                itemLabel="Part"
                listHeading="Refinery scope"
              />
            </div>
          </section>

          <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
            <div className="shell">
              <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
                <div>
                  <span className="accent-bar" />
                  <p className="eyebrow">Division 02</p>
                  <h2>Terminal Solutions</h2>
                </div>
                <p>Complete terminal automation systems, custody transfer metering, and terminal software.</p>
              </div>

              <DetailBrowser
                sections={terminalSections}
                kind="Solution"
                searchPlaceholder="Search terminal solutions..."
                panelLabel="Scope and delivery"
                itemLabel="Part"
                listHeading="Terminal scope"
              />
            </div>
          </section>

          <section className="section catalog-detail-cta">
            <div className="shell section-center gs-reveal">
              <span className="accent-bar center" />
              <h2>Ready to scope this solution?</h2>
              <p className="cta-copy">Discuss how Refinery & Terminal Automation can be shaped for your process, site constraints, and operational goals.</p>
              <div className="hero-actions center">
                <Link href="/contact" className="button primary">
                  Request Consultation
                </Link>
                <Link href="/solutions" className="button secondary">
                  All Solutions
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : isPowerWarehouse ? (
        <>
          <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
            <div className="shell">
              <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
                <div>
                  <span className="accent-bar" />
                  <p className="eyebrow">Division 01</p>
                  <h2>Power Plant Automation</h2>
                </div>
                <p>Advanced governor systems, material handling, boiler safety, and cycle management.</p>
              </div>

              <DetailBrowser
                sections={powerSections}
                kind="Solution"
                searchPlaceholder="Search power plant solutions..."
                panelLabel="Scope and delivery"
                itemLabel="Part"
                listHeading="Power Plant scope"
              />
            </div>
          </section>

          <section className="section catalog-detail-section" style={{ paddingBottom: 0 }}>
            <div className="shell">
              <div className="catalog-detail-summary gs-reveal" style={{ marginBottom: "32px" }}>
                <div>
                  <span className="accent-bar" />
                  <p className="eyebrow">Division 02</p>
                  <h2>Warehouse Logistic Solutions</h2>
                </div>
                <p>Digitalized warehouse WMS, barcoding, inventory visualization, and robotics automation.</p>
              </div>

              <DetailBrowser
                sections={warehouseSections}
                kind="Solution"
                searchPlaceholder="Search warehouse solutions..."
                panelLabel="Scope and delivery"
                itemLabel="Part"
                listHeading="Warehouse scope"
              />
            </div>
          </section>

          <section className="section catalog-detail-cta">
            <div className="shell section-center gs-reveal">
              <span className="accent-bar center" />
              <h2>Ready to scope this solution?</h2>
              <p className="cta-copy">Discuss how Power Plant & Warehouse Automation can be shaped for your process, site constraints, and operational goals.</p>
              <div className="hero-actions center">
                <Link href="/contact" className="button primary">
                  Request Consultation
                </Link>
                <Link href="/solutions" className="button secondary">
                  All Solutions
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : isChemicalPharma && !isPharmaLoggedIn ? (
        <section className="section catalog-detail-section">
          <div className="shell">
            <div className="portal-login-section" style={{ minHeight: "auto", padding: "40px 0 80px" }}>
              <div className="portal-login-card gs-reveal" style={{ margin: "0 auto", background: "#f8fbfd" }}>
                <div className="portal-icon" style={{ background: "rgba(0, 169, 227, 0.1)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }}>
                    <path d="M10 2h4M19 22H5c-1.1 0-2-.9-2-2 0-.3.1-.6.3-.8l7.2-9.6V5h3v4.6l7.2 9.6c.2.2.3.5.3.8 0 1.1-.9 2-2 2z" />
                  </svg>
                </div>
                <h1>Chemical & Pharma Portal</h1>
                <p className="portal-subtitle" style={{ marginBottom: "24px" }}>
                  Please enter your credentials to access Chemical & Pharma batch monitoring and compliance systems.
                </p>

                <form className="portal-form" onSubmit={handlePharmaLoginSubmit}>
                  <div className="input-group" style={{ marginBottom: "16px" }}>
                    <label className="mini-label" htmlFor="pharma-username" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>
                      Username
                    </label>
                    <input
                      id="pharma-username"
                      type="text"
                      placeholder="Enter username"
                      className="portal-input"
                      value={pharmaUsername}
                      onChange={(e) => setPharmaUsername(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>

                  <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label className="mini-label" htmlFor="pharma-password" style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>
                      Password
                    </label>
                    <input
                      id="pharma-password"
                      type="password"
                      placeholder="Enter password"
                      className="portal-input"
                      value={pharmaPassword}
                      onChange={(e) => setPharmaPassword(e.target.value)}
                      required
                    />
                  </div>

                  {pharmaError && (
                    <div className="portal-error" style={{ marginBottom: "20px" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {pharmaError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="button primary portal-submit"
                    disabled={pharmaLoading}
                  >
                    {pharmaLoading ? "Verifying..." : "Authorize Access"}
                  </button>
                </form>

                <div className="portal-login-footer" style={{ marginTop: "20px", paddingTop: "20px" }}>
                  <p>
                    Demo credentials: <strong style={{ color: "var(--accent)" }}>employee</strong> / <strong style={{ color: "var(--accent)" }}>1234</strong> or <strong style={{ color: "var(--accent)" }}>admin</strong> / <strong style={{ color: "var(--accent)" }}>5678</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {isChemicalPharma && isPharmaLoggedIn && (
            <div className="shell" style={{ display: "flex", justifyContent: "flex-end", padding: "24px 0 0" }}>
              <button 
                onClick={() => {
                  sessionStorage.removeItem("oiapl-pharma-auth");
                  setIsPharmaLoggedIn(false);
                }}
                className="portal-logout"
                style={{
                  fontSize: "0.82rem",
                  padding: "8px 16px",
                  background: "#fff0f0",
                  color: "#c0392b",
                  border: "1px solid #ffd4d4",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out Portal
              </button>
            </div>
          )}
          <DetailContentBrowser
            record={solution}
            kind="Solution"
            searchPlaceholder={`Search ${solution.title} scope...`}
            panelLabel="Scope and delivery"
            itemLabel="Part"
            listHeading="Solution scope"
            ctaTitle="Ready to scope this solution?"
            ctaCopy={`Discuss how ${solution.title} can be shaped for your process, site constraints, and operational goals.`}
            ctaHref="/contact"
            ctaLabel="Request Consultation"
            backHref="/solutions"
            backLabel="All Solutions"
          />
        </>
      )}
    </div>
  );
}
