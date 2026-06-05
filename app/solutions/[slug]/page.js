"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
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

  if (!solution) {
    notFound();
  }

  useEffect(() => {
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
        stats={[`${solution.content?.sections?.length || 0} scope areas`, "Engineering-led delivery", "Consultation available"]}
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
      ) : (
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
      )}
    </div>
  );
}
