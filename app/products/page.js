"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CatalogDirectory } from "../../components/catalog-directory";
import { CatalogHero } from "../../components/catalog-hero";
import { products } from "../../lib/products-data";

export default function ProductsPage() {
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
    <div ref={mainRef} className="products-directory-page">
      <CatalogHero
        eyebrow="Our Offerings"
        title="Industrial Product Portfolio"
        description="Explore SIL-rated control systems, field instrumentation, switchgear, fire and gas safety, analysers, and industrial software in one organized technical portfolio."
        image="/images/products/electrical_switchgear.png"
        imageAlt="Industrial control and switchgear product portfolio"
        stats={["10 product families", "Control, safety, field and software", "Industrial-grade partner systems"]}
      />

      <CatalogDirectory
        items={products}
        type="products"
        eyebrow="Product Portfolio"
        title="Configured for demanding industrial environments"
        description="Each product family is structured around real plant requirements: control reliability, measurement accuracy, safety compliance, field serviceability, and long-term maintainability."
        ctaLabel="View technical range"
      />
    </div>
  );
}
