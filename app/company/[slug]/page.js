"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../../components/page-hero";
import { companyPages } from "../../../lib/company-data";

export default function CompanyDetailPage() {
  const { slug } = useParams();
  const page = companyPages.find((p) => p.slug === slug);
  const mainRef = useRef(null);

  if (!page) {
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

  return (
    <div ref={mainRef}>
      <PageHero
        eyebrow="Company Information"
        title={page.title}
        description={page.description}
      />

      <section className="section section-white">
        <div className="shell">
          <div className="image-frame gs-reveal mb-16">
            <Image
              src={page.image}
              alt={page.title}
              width={1200}
              height={600}
              className="w-full object-cover rounded-lg"
              style={{ maxHeight: "500px" }}
            />
          </div>

          <div className="grid-one">
            {page.content.sections.map((section, idx) => (
              <article key={idx} className="section-content-block gs-reveal mb-16">
                <span className="accent-bar" />
                <h2 className="mb-6">{section.title}</h2>
                <p className="section-copy mb-8">{section.text}</p>
                {section.items && (
                  <ul className="detail-list grid-two">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell section-center gs-reveal">
          <h2 className="mb-8">Want to learn more about our commitment?</h2>
          <div className="hero-actions center">
            <a href="mailto:info@intelliactind.com" className="button primary">
              Contact Our Team
            </a>
            <Link href="/" className="button secondary">
              Home Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
