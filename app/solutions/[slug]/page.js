"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../../components/page-hero";
import { solutions } from "../../../lib/solutions-data";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutions.find((s) => s.slug === slug);
  const mainRef = useRef(null);
  const detailPanelRef = useRef(null);
  
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  if (!solution) {
    notFound();
  }

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return solution.content.sections;
    const query = searchQuery.toLowerCase();
    return solution.content.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.text.toLowerCase().includes(query) ||
        (s.items && s.items.some((item) => item.toLowerCase().includes(query)))
    );
  }, [searchQuery, solution]);

  // Adjust active index if it falls out of range of the filtered list
  useEffect(() => {
    if (activeIdx >= filteredSections.length) {
      setActiveIdx(0);
    }
  }, [filteredSections, activeIdx]);

  // GSAP scroll triggers for general page elements
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = mainRef.current.querySelectorAll(".gs-reveal");
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [slug]);

  // Animate detail panel contents when active item changes
  useEffect(() => {
    if (detailPanelRef.current) {
      gsap.fromTo(
        detailPanelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  const useTabLayout = solution.content.sections.length > 5;
  const activeSection = filteredSections[activeIdx];

  return (
    <div ref={mainRef} className="solution-detail-page">
      <PageHero
        eyebrow="Industrial Solution"
        title={solution.title}
        description={solution.description}
      />

      {useTabLayout ? (
        <section className="section section-soft" style={{ padding: "80px 0" }}>
          <div className="shell">
            {/* Search Block */}
            <div className="gs-reveal" style={{ maxWidth: "600px", margin: "0 auto 48px auto" }}>
              <div className="search-bar-wrapper" style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "var(--background, #fff)",
                border: "1px solid var(--line)",
                borderRadius: "30px",
                padding: "8px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "12px",
                  color: "var(--accent)",
                  flexShrink: 0
                }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder={`Search ${solution.title} modules...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "1rem",
                    color: "var(--ink)",
                    padding: "8px 0"
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--muted)",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      padding: "4px"
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Split Tab layout */}
            {filteredSections.length === 0 ? (
              <div className="text-center gs-reveal" style={{ padding: "80px 0", color: "var(--muted)" }}>
                <p>No solution modules match your search criteria. Try a different keyword.</p>
              </div>
            ) : (
              <div className="interactive-tab-layout gs-reveal" style={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                background: "var(--background, #fff)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                overflow: "hidden",
                minHeight: "650px",
                boxShadow: "var(--shadow)"
              }}>
                
                {/* Left navigation column */}
                <div className="tab-navigation-sidebar" style={{
                  width: "35%",
                  borderRight: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--soft, #f8fbfd)",
                  maxHeight: "750px",
                  overflowY: "auto"
                }}>
                  {filteredSections.map((sec, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "24px 32px",
                          background: isActive ? "var(--background, #fff)" : "transparent",
                          border: "none",
                          borderLeft: isActive ? "4px solid var(--accent)" : "4px solid transparent",
                          borderBottom: "1px solid var(--line)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px"
                        }}
                      >
                        <span style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: isActive ? "var(--accent)" : "var(--muted)",
                          textTransform: "uppercase",
                          letterSpacing: "1px"
                        }}>
                          Module {String(idx + 1).padStart(2, "0")}
                        </span>
                        <strong style={{
                          fontSize: "1.1rem",
                          color: isActive ? "var(--ink)" : "var(--muted)",
                          fontWeight: isActive ? "700" : "600"
                        }}>
                          {sec.title}
                        </strong>
                      </button>
                    );
                  })}
                </div>

                {/* Right content details panel */}
                <div ref={detailPanelRef} className="tab-details-panel" style={{
                  width: "65%",
                  padding: "48px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "32px",
                  overflowY: "auto"
                }}>
                  <div>
                    {/* Visual metadata header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                      <span style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      }}>
                        Scope & Details
                      </span>
                      <span style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        background: "rgba(0, 169, 227, 0.08)",
                        color: "var(--accent)",
                        padding: "4px 12px",
                        borderRadius: "12px"
                      }}>
                        Module {String(activeIdx + 1).padStart(2, "0")} of {filteredSections.length}
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: "2.2rem",
                      color: "var(--ink)",
                      marginBottom: "24px",
                      lineHeight: "1.25"
                    }}>
                      {activeSection.title}
                    </h2>

                    {activeSection.text && (
                      <p style={{
                        fontSize: "1.05rem",
                        lineHeight: "1.7",
                        color: "var(--muted)",
                        marginBottom: "32px"
                      }}>
                        {activeSection.text}
                      </p>
                    )}

                    {activeSection.items && activeSection.items.length > 0 && (
                      <div>
                        <h4 style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: "var(--ink)",
                          marginBottom: "16px"
                        }}>
                          Features & Core Deliverables
                        </h4>
                        <ul className="detail-list" style={{ paddingLeft: "0", listStyle: "none" }}>
                          {activeSection.items.map((item) => (
                            <li key={item} style={{
                              fontSize: "0.95rem",
                              lineHeight: "1.6",
                              color: "var(--muted)",
                              marginBottom: "12px",
                              paddingLeft: "28px",
                              position: "relative"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: "0",
                                top: "2px",
                                color: "var(--accent)",
                                fontWeight: "bold"
                              }}>✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Visual Frame */}
                  <div className="tab-image-container" style={{
                    width: "100%",
                    height: "220px",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid var(--line)"
                  }}>
                    <Image
                      src={activeIdx === 0 ? solution.image : `/images/solutions/detail-${activeIdx % 4}.jpg`}
                      alt={activeSection.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.src = solution.image; // Fallback
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        solution.content.sections.map((section, idx) => (
          <section 
            key={idx} 
            className={idx % 2 === 0 ? "section section-white" : "section section-soft"}
          >
            <div className="shell two-column">
              <div className={`gs-reveal ${idx % 2 === 1 ? "order-2" : ""}`}>
                <span className="accent-bar" />
                <p className="eyebrow">Part 0{idx + 1}</p>
                <h2 className="mb-6">{section.title}</h2>
                <p className="section-copy mb-8">{section.text}</p>
                {section.items && (
                  <ul className="detail-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={`image-frame gs-reveal ${idx % 2 === 1 ? "order-1" : ""}`}>
                <Image
                  src={idx === 0 ? solution.image : `/images/solutions/detail-${idx}.jpg`}
                  alt={section.title}
                  width={900}
                  height={700}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = solution.image; // Fallback to main solution image if specific one missing
                  }}
                />
                <div className="image-number">0{idx + 1}</div>
              </div>
            </div>
          </section>
        ))
      )}

      <section className="section">
        <div className="shell section-center gs-reveal">
          <span className="accent-bar center" />
          <h2 className="mb-8">Ready to implement this solution?</h2>
          <p className="cta-copy mb-12">
            Let's discuss how our {solution.title} expertise can optimize your specific industrial process.
          </p>
          <div className="hero-actions center">
            <a href="mailto:info@intelliactind.com" className="button primary">
              Request a Consultation
            </a>
            <Link href="/solutions" className="button secondary">
              All Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


