"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CatalogHero } from "../../../components/catalog-hero";
import { DetailContentBrowser } from "../../../components/detail-content-browser";
import { products } from "../../../lib/products-data";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const mainRef = useRef(null);

  if (!product) {
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

  return (
    <div ref={mainRef} className="product-detail-page">
      <CatalogHero
        eyebrow="Product Portfolio"
        title={product.title}
        description={product.description}
        image={product.image}
        imageAlt={product.title}
        stats={[`${product.content?.sections?.length || 0} technical modules`, "Application-fit product range", "Sales support available"]}
      />

      <DetailContentBrowser
        record={product}
        kind="Product"
        searchPlaceholder={`Search ${product.title} options...`}
        panelLabel="Technical range"
        itemLabel="Module"
        listHeading="Product modules"
        ctaTitle="Need technical specifications?"
        ctaCopy={`Contact our sales team for ${product.title} datasheets, pricing, and fitment guidance.`}
        ctaHref="/contact"
        ctaLabel="Request Details"
        backHref="/products"
        backLabel="All Products"
      />
    </div>
  );
}
