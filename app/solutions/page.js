"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../components/page-hero";
import { solutionMarquee, solutions } from "../../lib/site-data";

export default function SolutionsPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = mainRef.current.querySelectorAll(".gs-reveal");
    reveals.forEach((el, i) => {
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
    <div ref={mainRef}>
      <PageHero
        eyebrow="What We Offer"
        title="Engineered Solutions for Modern Industry"
        description="From control system design to full-scale process automation, IntelliAct delivers end-to-end industrial solutions built for performance, safety, and longevity."
      >
        <div className="tag-row left">
          {solutions.map((solution) => (
            <a
              className="industry-tag"
              href={`#${solution.id}`}
              key={solution.id}
            >
              {solution.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="marquee-bar">
        <div className="marquee-track text-only">
          {[...solutionMarquee, ...solutionMarquee].map((item, index) => (
            <span className="marquee-text" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {solutions.map((solution, index) => (
        <section
          className={index % 2 ? "section section-soft" : "section"}
          id={solution.id}
          key={solution.id}
        >
          <div className="shell two-column">
            <div
              className={
                index % 2
                  ? "image-frame gs-reveal order-2"
                  : "image-frame gs-reveal"
              }
            >
              <Image
                src={solution.image}
                alt={solution.title}
                width={900}
                height={760}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="image-number">{solution.number}</div>
            </div>
            <div className="gs-reveal">
              <span className="accent-bar" />
              <p className="eyebrow">Solution {solution.number}</p>
              <h2>{solution.title}</h2>
              <p className="section-copy">{solution.intro}</p>
              <ul className="detail-list" style={{ marginBottom: '32px' }}>
                {solution.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Link href={`/solutions/${solution.slug}`} className="button secondary">
                Read Detailed Solution
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="shell">
          <div className="section-center gs-reveal">
            <span className="accent-bar center" />
            <p className="eyebrow">How We Work</p>
            <h2>Our Delivery Process</h2>
          </div>
          <div className="feature-grid four-up">
            {[
              {
                num: "01",
                title: "Consultation & Scoping",
                copy: "We begin with a detailed site visit and requirements workshop to define project scope, deliverables, and success criteria.",
              },
              {
                num: "02",
                title: "Engineering Design",
                copy: "Our engineers prepare detailed designs — control narratives, P&IDs, panel drawings, and software specifications.",
              },
              {
                num: "03",
                title: "Build & Testing",
                copy: "Panel fabrication, software development, and system integration are completed in-house, followed by rigorous testing.",
              },
              {
                num: "04",
                title: "Commissioning & Support",
                copy: "Site installation, commissioning, operator training, and technical support ensure your system performs from day one.",
              },
            ].map((step) => (
              <article className="panel-card gs-reveal" key={step.num}>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell grid-four text-center">
          <div className="gs-reveal">
            <p className="stat-num">500+</p>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="gs-reveal">
            <p className="stat-num">12+</p>
            <p className="stat-label">Industries Served</p>
          </div>
          <div className="gs-reveal">
            <p className="stat-num">25+</p>
            <p className="stat-label">Years of Expertise</p>
          </div>
          <div className="gs-reveal">
            <p className="stat-num">150+</p>
            <p className="stat-label">Clients Worldwide</p>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="shell section-center">
          <h2 className="gs-reveal">Need a solution built for your process?</h2>
          <p className="cta-copy gs-reveal">
            We can structure the right mix of engineering, controls, SCADA,
            instrumentation, and field execution around your plant requirements.
          </p>
          <a
            href="mailto:info@intelliactind.com"
            className="button primary gs-reveal"
          >
            Discuss a Requirement
          </a>
        </div>
      </section>
    </div>
  );
}
