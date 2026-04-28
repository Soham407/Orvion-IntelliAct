"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../../components/page-hero";
import { solutions } from "../../../lib/solutions-data";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutions.find((s) => s.slug === slug);
  const mainRef = useRef(null);

  if (!solution) {
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
        eyebrow="Industrial Solution"
        title={solution.title}
        description={solution.description}
      />

      {solution.content.sections.map((section, idx) => (
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
      ))}

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
