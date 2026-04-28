"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../components/page-hero";
import { ProjectsGrid } from "../../components/projects-grid";
import { projects, solutionMarquee } from "../../lib/site-data";

export default function ProjectsPage() {
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
        eyebrow="Our Work"
        title="Projects and Installations"
        description="A selection of industrial automation projects delivered across manufacturing, process, and infrastructure sectors."
      />

      <section className="marquee-bar">
        <div className="marquee-track text-only">
          {[...solutionMarquee, ...solutionMarquee].map((item, index) => (
            <span className="marquee-text" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <ProjectsGrid projects={projects} />

      <section className="section section-soft">
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
          <h2 className="gs-reveal">Looking for a similar execution model?</h2>
          <p className="cta-copy gs-reveal">
            We can tailor project delivery for new builds, expansions, upgrades,
            and brownfield automation work.
          </p>
          <a
            href="mailto:info@intelliactind.com"
            className="button primary gs-reveal"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}
