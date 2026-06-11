"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CatalogDirectory } from "../../components/catalog-directory";
import { CatalogHero } from "../../components/catalog-hero";
import { solutions } from "../../lib/solutions-data";

export default function SolutionsPage() {
  const mainRef = useRef(null);

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
  }, []);

  return (
    <div ref={mainRef} className="solutions-directory-page">
      <CatalogHero
        eyebrow="Industrial Expertise"
        title="Engineered Automation Solutions"
        description="Automation architectures, process optimization, safety controls, warehouse logistics, and monitoring systems built for complex industrial operations."
        image="/images/hero/Hero.avif"
        imageAlt="Industrial automation solution environment"
        stats={["7 solution areas", "PLC, SCADA, safety and optimization", "Built for critical operations"]}
      />

      <CatalogDirectory
        items={solutions}
        type="solutions"
        eyebrow="Solution Portfolio"
        title="Purpose-built scopes for critical operations"
        description="Each solution area is organized around implementation scope, control architecture, operator visibility, field execution, and lifecycle support."
        ctaLabel="Explore solution details"
      />
    </div>
  );
}
