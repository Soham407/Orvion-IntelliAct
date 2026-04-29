"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LogoMarquee } from "../components/logo-marquee";
import { SolutionsCarousel } from "../components/solutions-carousel";
import {
  clientLogos,
  directors,
  industries,
  operationalHighlights,
  coreValues,
  productList,
  partnerLogos,
  epcLogos,
} from "../lib/site-data";

export default function HomePage() {
  const heroHeadlineRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroSideRef = useRef(null);
  const heroCardRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (heroLabelRef.current) {
      tl.fromTo(heroLabelRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    if (heroHeadlineRef.current) {
      tl.fromTo(heroHeadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }

    if (heroCopyRef.current) {
      tl.fromTo(heroCopyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (heroActionsRef.current) {
      tl.fromTo(heroActionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (heroSideRef.current) {
      tl.fromTo(heroSideRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.5
      );
    }

    if (heroCardRef.current) {
      tl.fromTo(heroCardRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        0.8
      );
    }

    // Scroll reveal animations
    const revealElements = mainRef.current.querySelectorAll(".gs-reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // Cleanup and refresh
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="home-page">
      <section className="hero-home">
        <div className="hero-grid" />
        <div className="shell hero-home-inner">
          <div className="hero-content">
            <p className="eyebrow" ref={heroLabelRef}>
              IntelliAct Automation Pvt. Limited
            </p>
            <h1 ref={heroHeadlineRef}>
              Intelligent Automation For Demanding Industry
            </h1>
            <p className="hero-copy" ref={heroCopyRef}>
              We engineer PLC, SCADA, HMI, and process control systems that bring
              clarity, uptime, and measurable performance to complex industrial
              operations.
            </p>
            <div className="hero-actions" ref={heroActionsRef}>
              <Link href="/solutions" className="button primary">
                Explore Solutions
              </Link>
              <Link href="/projects" className="button secondary">
                View Projects
              </Link>
            </div>
          </div>

          <aside className="hero-side" ref={heroSideRef}>
            <div className="hero-note">
              High-reliability automation for oil and gas, power, water, chemicals,
              and manufacturing environments where system stability matters.
            </div>
            <div className="floating-card" ref={heroCardRef}>
              <Image
                src="/images/water scada.jpeg"
                alt="Water SCADA infrastructure"
                width={640}
                height={360}
                sizes="(max-width: 1024px) 100vw, 320px"
              />
              <div>
                <span className="card-label">Featured Capability</span>
                <h2>SCADA and Process Visibility</h2>
                <p>
                  Unify field data, alarms, and operator control into one dependable
                  automation layer.
                </p>
              </div>
            </div>
          </aside>
        </div>
        <div className="scroll-line">
          <span>Scroll</span>
          <div className="scroll-line-bar" />
        </div>
      </section>

      <LogoMarquee 
        eyebrow="Market Presence" 
        title="Our Top Customer Connects" 
        logos={clientLogos} 
      />

      <section className="section">
        <div className="shell two-column">
          <div className="image-frame gs-reveal">
            <Image
              src="/images/engg 1.png"
              alt="Automation engineering desk"
              width={900}
              height={1040}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="image-badge">
              <span>25+ Years of Leadership</span>
              <strong>OIAPL</strong>
            </div>
          </div>
          <div className="gs-reveal">
            <span className="accent-bar" />
            <p className="eyebrow">Who We Are</p>
            <h2>Engineering the Future of Industrial Automation</h2>
            <div className="stack-copy">
              <p>
                IntelliAct Automation Pvt. Limited is a premier industrial automation
                company with decades of proven expertise. We bridge the gap between
                traditional operations and intelligent, connected manufacturing across
                some of India&apos;s most demanding industrial environments.
              </p>
              <p>
                Our certified engineers specialise in PLC programming, SCADA systems,
                HMI design, process automation, and industrial IoT — delivering systems
                that are reliable, scalable, and precisely tailored to your
                operational requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-center gs-reveal">
            <p className="eyebrow">What We Do</p>
            <h2>Our Core SERVICES</h2>
          </div>
          <div className="feature-grid">
            <article className="media-card gs-reveal">
              <Image
                src="/images/chemical 1.png"
                alt="Engineering Services"
                width={900}
                height={560}
              />
              <div className="media-card-copy">
                <h3>Engineering Services</h3>
                <p>
                  Expert solution on Engineering (Design, Detailed, Hardware,
                  Software), Project Execution, Site Implementation, AMC (Annual
                  Maintenance Services) and Manpower provision on field like
                  Safety, Security, Reliability and Sustainability side across all
                  Process & Automation Industries.
                </p>
              </div>
            </article>
            <article className="media-card gs-reveal">
              <Image
                src="/images/Software Industry.jpg"
                alt="Software Services"
                width={900}
                height={560}
              />
              <div className="media-card-copy">
                <h3>Software Services</h3>
                <p>
                  We are into Industrial software & mobility applications like
                  Cyber, Industry 4.0, IIoT and AI initiatives, etc to analyses your
                  asset data, converting it into actionable intelligence that is
                  used throughout Engineering, Operations, Maintenance, Analytic
                  applications and the IT enterprise to enhance your business
                  outcomes across all industries.
                </p>
              </div>
            </article>
            <article className="media-card gs-reveal">
              <Image
                src="/images/water scada.jpeg"
                alt="Consultancy"
                width={900}
                height={560}
              />
              <div className="media-card-copy">
                <h3>Consultancy</h3>
                <p>
                  We outline Clearly the boundaries of the consultancy work.
                  Defining deliverables, timelines, and key performance indicators
                  (KPIs). Identifying roles and responsibilities for both the
                  consultant and the client.
                </p>
              </div>
            </article>
            <article className="media-card gs-reveal">
              <Image
                src="/images/manpower 1.png"
                alt="Manpower Services"
                width={900}
                height={560}
              />
              <div className="media-card-copy">
                <h3>Manpower Services</h3>
                <p>
                  We offers a workforce of highly skilled, certified professionals
                  in automation, control systems, and maintenance, ensuring clients
                  have the right resources to operate and maintain their automated
                  systems.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SolutionsCarousel />

      <section id="products" className="section section-white">
        <div className="shell">
          <div className="section-center gs-reveal" style={{ marginBottom: '64px' }}>
            <p className="eyebrow">Comprehensive Portfolio</p>
            <h2>ALL PRODUCTS LIST</h2>
          </div>
          
          <div className="stack-grid">
            {productList.map((product, index) => (
              <div key={product.title} className="two-column" style={{ padding: '64px 0', borderBottom: index !== productList.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div 
                  className="image-frame gs-reveal" 
                  style={{ order: index % 2 === 1 ? 2 : 1 }}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={900}
                    height={600}
                    style={{ height: '480px', objectFit: 'cover' }}
                  />
                </div>
                <div 
                  className="gs-reveal"
                  style={{ order: index % 2 === 1 ? 1 : 2 }}
                >
                  <span className="accent-bar" />
                  <p className="eyebrow" style={{ fontSize: '0.65rem' }}>Category 0{index + 1}</p>
                  <h3 style={{ fontSize: '2.4rem', marginBottom: '28px' }}>{product.title}</h3>
                  <ul className="detail-list" style={{ marginBottom: '32px' }}>
                    {product.items.map((item) => (
                      <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
                    ))}
                  </ul>
                  <Link href={`/products/${product.slug}`} className="button secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <span className="accent-bar gs-reveal" />
          <p className="eyebrow gs-reveal">Mission and Vision</p>
          <h2 className="section-title gs-reveal">Built on trust, innovation, service, safety, and quality.</h2>
          <div className="grid-two mission-grid">
            <article className="panel-card gs-reveal">
              <p className="mini-label">Our Mission</p>
              <h3>Most Trusted Provider</h3>
              <p>
                To become the most trusted provider of automation solutions by
                delivering cutting-edge technology, innovation, exceptional service,
                safety, and superior quality in a highly competitive manner.
              </p>
              <p>
                We strive to create value for our customers, make a meaningful
                difference, and build lasting relationships through professionalism
                and transparency.
              </p>
            </article>
            <article className="panel-card gs-reveal">
              <p className="mini-label">Our Vision</p>
              <h3>Leading One-Stop Solutions Provider</h3>
              <p>
                To become the leading one-stop solutions provider, revolutionizing the
                automation industry with innovative, reliable, and comprehensive
                solutions and services.
              </p>
              <p>
                Orvion IntelliAct aspires to lead the industrial automation sector by
                embracing the latest technologies to deliver sustainable and
                intelligent solutions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="accent-bar gs-reveal" />
          <p className="eyebrow gs-reveal">Core Foundations</p>
          <h2 className="section-title gs-reveal">Our Core Values</h2>
          <div className="feature-grid">
            {coreValues.map((item) => (
              <article className="feature-card gs-reveal" key={item.title}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="feature-icon"
                />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee 
        eyebrow="Global Technology" 
        title="Our Trusted Partners" 
        logos={partnerLogos} 
        className="large-logos"
      />

      <section className="section" id="directors">
        <div className="shell">
          <div className="section-center gs-reveal" style={{ marginBottom: '40px' }}>
            <h2 className="logo-strip-title">Meet the Directors</h2>
          </div>
          <div className="director-grid">
            {directors.map((director, index) => (
              <article className="director-card gs-reveal" key={director.name}>
                <div className="director-visual">
                  <span className="director-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="director-photo-frame">
                    <Image
                      src={director.image}
                      alt={director.name}
                      width={900}
                      height={1400}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="director-photo"
                      style={director.photoStyle}
                    />
                  </div>
                  <div className="director-identity">
                    <span className="mini-label director-role">{director.role}</span>
                    <h3>{director.name}</h3>
                    <p className="director-subtitle">
                      {director.subtitleLines ? (
                        director.subtitleLines.map((line, index) => (
                          <span
                            key={line}
                            style={{ display: "block", marginTop: index > 0 ? "2px" : 0 }}
                          >
                            {line}
                          </span>
                        ))
                      ) : (
                        director.subtitle
                      )}
                    </p>
                  </div>
                </div>
                <div className="director-copy">
                  <div className="director-bio">
                    {director.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className={paragraph.trim() === "." ? "director-bio-placeholder" : undefined}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="director-expertise">
                    <p className="mini-label" style={{ fontSize: '0.6rem', color: 'var(--ink)', marginBottom: '12px', opacity: 0.6 }}>Key Expertise & Credentials</p>
                    <ul className="detail-list">
                      {director.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee 
        eyebrow="Strategic Alliances" 
        title="Our Top EPC Connects" 
        logos={epcLogos} 
        reverse={true} 
        className="large-logos"
      />

      <section className="section section-muted">
        <div className="shell">
          <div className="section-center gs-reveal" style={{ marginBottom: '64px' }}>
            <p className="eyebrow">Infrastructure and Recognition</p>
            <h2>Operational Highlights</h2>
          </div>
          <div className="feature-grid three-up">
            {operationalHighlights.map((item) => (
              <article className="feature-card gs-reveal" key={item.title}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="feature-icon"
                />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industries-section">
        <div className="shell section-center gs-reveal">
          <p className="eyebrow">Sectors We Serve</p>
          <h2>Industries</h2>
          <div className="tag-row">
            {[
              "Manufacturing",
              "Oil & Gas",
              "Pharmaceuticals",
              "Water Treatment",
              "Food & Beverage",
              "Power & Energy",
              "Chemicals",
              "Mining",
              "Steel & Metals",
              "Infrastructure",
            ].map((industry) => (
              <span className="industry-tag" key={industry}>
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="shell section-center">
          <span className="accent-bar center gs-reveal" />
          <h2 className="gs-reveal">Ready to Automate Your Operations?</h2>
          <p className="cta-copy gs-reveal">
            Let&apos;s discuss how IntelliAct can engineer and deliver the
            automation solution your industry demands.
          </p>
          <div className="hero-actions center gs-reveal">
            <a href="mailto:info@intelliactind.com" className="button primary">
              Get In Touch
            </a>
            <Link href="/projects" className="button secondary">
              View Our Work
            </Link>
          </div>
          <div className="contact-grid">
            <div className="gs-reveal">
              <p className="mini-label">Email</p>
              <a href="mailto:info@intelliactind.com">info@intelliactind.com</a>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Website</p>
              <p>intelliactind.com</p>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Office</p>
              <p>India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
