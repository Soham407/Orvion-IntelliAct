"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../components/page-hero";
import { products } from "../../lib/products-data";

export default function ProductsPage() {
  const mainRef = useRef(null);

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
  }, []);

  return (
    <div ref={mainRef} className="products-directory-page">
      <PageHero
        eyebrow="Our Offerings"
        title="Industrial Product Portfolio"
        description="Explore our range of SIL-rated control systems, high-precision field instrumentation, switchgears, and enterprise IIoT software."
      />

      <section className="section section-soft" style={{ padding: "80px 0" }}>
        <div className="shell">
          <div className="grid-three" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "32px",
            alignItems: "stretch"
          }}>
            {products.map((product, idx) => (
              <article
                key={product.slug}
                className="gs-reveal product-directory-card"
                style={{
                  background: "var(--background, #fff)",
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 10px 30px rgba(20, 36, 52, 0.03)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative"
                }}
              >
                {/* Visual Image Header */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  overflow: "hidden"
                }}>
                  <Image
                    src={product.image || "/images/chemical 1.png"}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(8, 15, 31, 0.75)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase"
                  }}>
                    Cat {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between"
                }}>
                  <div>
                    <h3 style={{
                      fontSize: "1.4rem",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontWeight: 700
                    }}>
                      {product.title}
                    </h3>
                    <p style={{
                      fontSize: "0.92rem",
                      lineHeight: "1.6",
                      color: "var(--muted)",
                      marginBottom: "24px"
                    }}>
                      {product.description}
                    </p>

                    {product.content && product.content.sections && (
                      <div style={{ marginBottom: "24px" }}>
                        <span style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--accent)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          display: "block",
                          marginBottom: "12px"
                        }}>
                          Includes
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {product.content.sections.slice(0, 3).map((sec) => (
                            <span key={sec.title} style={{
                              fontSize: "0.8rem",
                              background: "var(--soft, #f8fbfd)",
                              border: "1px solid var(--line)",
                              color: "var(--ink)",
                              padding: "4px 10px",
                              borderRadius: "6px"
                            }}>
                              {sec.title}
                            </span>
                          ))}
                          {product.content.sections.length > 3 && (
                            <span style={{
                              fontSize: "0.8rem",
                              color: "var(--muted)",
                              padding: "4px 4px"
                            }}>
                              +{product.content.sections.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="button secondary"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      display: "block",
                      marginTop: "auto",
                      border: "1px solid var(--line)"
                    }}
                  >
                    View Technical Range →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
