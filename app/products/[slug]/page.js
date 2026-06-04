"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../../components/page-hero";
import { products } from "../../../lib/products-data";

import { useState, useMemo } from "react";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const mainRef = useRef(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  if (!product) {
    notFound();
  }

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

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return product.content.sections;
    const query = searchQuery.toLowerCase();
    return product.content.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.text.toLowerCase().includes(query) ||
        (s.items && s.items.some((item) => item.toLowerCase().includes(query)))
    );
  }, [searchQuery, product]);

  const useGridLayout = product.content.sections.length > 5;

  return (
    <div ref={mainRef} className="product-detail-page">
      <PageHero
        eyebrow="Product Portfolio"
        title={product.title}
        description={product.description}
      />

      {useGridLayout ? (
        <section className="section section-soft">
          <div className="shell">
            {/* Search Block */}
            <div className="gs-reveal" style={{ maxWidth: "600px", margin: "0 auto 48px auto" }}>
              <div className="search-bar-wrapper" style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "var(--background)",
                border: "1px solid var(--line)",
                borderRadius: "30px",
                padding: "8px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
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
                  placeholder={`Search ${product.title}...`}
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

            {/* Grid display */}
            {filteredSections.length === 0 ? (
              <div className="text-center gs-reveal" style={{ padding: "80px 0", color: "var(--muted)" }}>
                <p>No products match your search criteria. Try a different keyword.</p>
              </div>
            ) : (
              <div className="grid-three" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
                alignItems: "stretch"
              }}>
                {filteredSections.map((section, idx) => (
                  <article 
                    key={idx} 
                    className="gs-reveal spec-grid-card"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--line)",
                      borderRadius: "12px",
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    {/* Visual decoration */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "4px",
                      height: "100%",
                      background: "var(--accent)"
                    }} />
                    
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "12px"
                    }}>
                      Module {String(idx + 1).padStart(2, "0")}
                    </span>
                    
                    <h3 style={{ 
                      fontSize: "1.35rem", 
                      marginBottom: "16px",
                      color: "var(--ink)"
                    }}>{section.title}</h3>
                    
                    <p style={{ 
                      fontSize: "0.92rem", 
                      lineHeight: 1.6, 
                      color: "var(--muted)",
                      marginBottom: "20px",
                      flexGrow: 1 
                    }}>{section.text}</p>
                    
                    {section.items && section.items.length > 0 && (
                      <ul className="detail-list" style={{ 
                        marginTop: "auto", 
                        borderTop: "1px solid var(--line)", 
                        paddingTop: "16px" 
                      }}>
                        {section.items.map((item) => (
                          <li key={item} style={{ 
                            fontSize: "0.85rem",
                            lineHeight: 1.5,
                            marginBottom: "8px",
                            paddingLeft: "16px"
                          }}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        product.content.sections.map((section, idx) => (
          <section 
            key={idx} 
            className={idx % 2 === 0 ? "section section-white" : "section section-soft"}
          >
            <div className="shell two-column">
              <div className={`gs-reveal ${idx % 2 === 1 ? "order-2" : ""}`}>
                <span className="accent-bar" />
                <p className="eyebrow">Product Specs 0{idx + 1}</p>
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
                  src={idx === 0 ? product.image : `/images/products/detail-${idx}.jpg`}
                  alt={section.title}
                  width={900}
                  height={700}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = product.image; // Fallback to main product image if specific one missing
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
          <h2 className="mb-8">Technical Inquiry</h2>
          <p className="cta-copy mb-12">
            Interested in {product.title}? Contact our sales team for detailed specifications, data sheets, and pricing.
          </p>
          <div className="hero-actions center">
            <a href="mailto:info@intelliactind.com" className="button primary">
              Inquire Now
            </a>
            <Link href="/" className="button secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
