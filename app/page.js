"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  esteemedClienteleLogos,
} from "../lib/site-data";

const officeMapUrl =
  "https://www.google.com/maps/search/?api=1&query=804%20The%20Cosmopolis%20Building%20Opp%20Seasons%20Mall%20Hadapsar%20Magarpatta%20Pune%20411028%20India";

export default function HomePage() {
  const heroHeadlineRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroSideRef = useRef(null);
  const heroCardRef = useRef(null);
  const mainRef = useRef(null);

  const heroImages = [
    "/images/products/oil+refinery+in+Atlanta-+GA.jpeg",
    "/2149057713.jpg",
    "/17731.jpg",
    "/119619.jpg",
    "/305.jpg",
  ];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
        <div className="hero-bg-carousel">
          {heroImages.map((img, idx) => (
            <div
              key={img}
              className={`hero-bg-slide ${idx === currentImageIdx ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-bg-gradients" />
        </div>
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
                src="/images/products/water scada.jpeg"
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

      <section className="client-logo-grid-section">
        <div className="shell">
          <div className="section-center gs-reveal section-header-gap">
            <p className="eyebrow">Global Technology</p>
            <h2>Our Trusted Partners</h2>
          </div>
          <div className="client-logo-grid partners-logo-grid">
            {partnerLogos.map((logo) => (
              <div className="client-logo-cell partners-logo-cell gs-reveal" key={logo.alt}>
                <div>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div className="image-frame gs-reveal">
            <Image
              src="/images/company/engg 1.png"
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
                src="/images/products/chemical 1.png"
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
                src="/images/products/Software Industry.jpg"
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
                src="/images/products/water scada.jpeg"
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
                src="/images/company/manpower 1.png"
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

      <section className="client-logo-grid-section">
        <div className="shell">
          <div className="section-center gs-reveal section-header-gap">
            <p className="eyebrow">Market Presence</p>
            <h2>Our Top Customer Connects</h2>
          </div>
          <div className="client-logo-grid">
            {clientLogos.map((logo) => (
              <div className="client-logo-cell gs-reveal" key={logo.alt}>
                <div>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                  />
                  <span className="client-logo-name">{logo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SolutionsCarousel />

      <section id="products" className="section section-white">
        <div className="shell">
          <div className="section-center gs-reveal section-header-gap-lg">
            <p className="eyebrow">Comprehensive Portfolio</p>
            <h2>ALL PRODUCTS LIST</h2>
          </div>
          
          <div className="stack-grid">
            {productList.map((product, index) => (
              <div key={product.title} className={`two-column product-list-item${index !== productList.length - 1 ? '' : ' product-list-item-last'}`}>
                <div 
                  className={`image-frame gs-reveal${index % 2 === 1 ? ' order-2' : ''}`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={900}
                    height={600}
                    className="product-list-image"
                  />
                </div>
                <div 
                  className={`gs-reveal${index % 2 === 1 ? ' order-1' : ''}`}
                >
                  <span className="accent-bar" />
                  <p className="eyebrow product-list-eyebrow">Category 0{index + 1}</p>
                  <h3 className="product-list-title">{product.title}</h3>
                  <ul className="detail-list product-list-details">
                    {product.items.map((item) => (
                      <li key={item}>{item}</li>
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

      <LogoMarquee 
        eyebrow="Market Footprint" 
        title="Our Esteemed Clientele" 
        logos={esteemedClienteleLogos} 
      />

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



      <section className="section" id="directors">
        <div className="shell">
          <div className="section-center gs-reveal" style={{ marginBottom: '40px' }}>
            <h2 className="logo-strip-title">Meet the Directors</h2>
          </div>
          <div className="director-grid">
            {directors.map((director) => (
              <article className="director-card gs-reveal" key={director.name}>
                <div className="director-photo-frame">
                  <Image
                    src={director.image}
                    alt={director.name}
                    width={900}
                    height={1400}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="director-photo"
                  />
                </div>
                <div className="director-copy">
                  <div className="director-header">
                    <span className="mini-label">{director.role}</span>
                    <h3>{director.name}</h3>
                    <p className="director-subtitle">{director.subtitle}</p>
                  </div>
                  <div className="director-bio">
                    {director.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx} style={{ marginBottom: '12px', minHeight: paragraph === "" ? "24px" : "auto" }}>{paragraph}</p>
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
          <div className="section-center gs-reveal section-header-gap">
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
              <p className="mini-label">General Inquiries</p>
              <a href="mailto:info@intelliactind.com">info@intelliactind.com</a>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Sales</p>
              <a href="mailto:sales@intelliactind.com">sales@intelliactind.com</a>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Careers</p>
              <a href="mailto:Careers@intelliactind.com">Careers@intelliactind.com</a>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Website</p>
              <p>intelliactind.com</p>
            </div>
            <div className="gs-reveal">
              <p className="mini-label">Office</p>
              <p>804, The Cosmopolis Building, Opp. Seasons Mall, Hadapsar, Magarpatta, Pune, 411028, India</p>
              <a href={officeMapUrl} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
