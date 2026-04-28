"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const powerPlantSections = [
  {
    id: "boiler-automation",
    title: "Boiler Automation",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Bolier.jpg/:/cr=t:12.41%25,l:0%25,w:100%25,h:75.19%25/rs=w:480,h:361,cg:true",
    alt: "Boiler automation system",
    points: [
      "Real-time monitoring of boiler parameters.",
      "Optimized combustion control for enhanced fuel efficiency.",
      "Emission monitoring to meet environmental regulations.",
    ],
  },
  {
    id: "turbine-control",
    title: "Turbine Control Systems",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/turbine.jpg/:/cr=t:12.41%25,l:0%25,w:100%25,h:75.19%25/rs=w:480,h:361,cg:true",
    alt: "Turbine control systems",
    points: [
      "Advanced governor control for speed regulation.",
      "Vibration monitoring for predictive maintenance.",
      "Turbine efficiency optimization.",
    ],
  },
  {
    id: "coal-ash-handling",
    title: "Coal and Ash Handling Automation",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Coal.jpg/:/cr=t:12.25%25,l:0%25,w:100%25,h:75.5%25/rs=w:482,h:362,cg:true",
    alt: "Coal and ash handling automation",
    points: [
      "Efficient material handling systems with minimal losses.",
      "Dust suppression and waste management automation.",
    ],
  },
  {
    id: "water-steam",
    title: "Water Treatment and Steam Cycle Management",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/water-ad7c643.jpg/:/cr=t:12.25%25,l:0%25,w:100%25,h:75.5%25/rs=w:482,h:362,cg:true",
    alt: "Water treatment and steam cycle management",
    points: [
      "Automation of feed water systems.",
      "Condenser and cooling tower control.",
    ],
  },
];

const warehouseSections = [
  {
    id: "system-main-functions",
    title: "System Main Functions",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/logist.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:720,cg:true",
    alt: "Warehouse logistic solutions overview",
    points: [
      "Planning & Scheduling Management",
      "Tank Management",
      "Warehouse Management",
      "Yard Management",
      "Receiving and Shipping Logistics Management",
      "Finished Product Bagging & Logistic Packaging",
    ],
  },
  {
    id: "core-functions",
    title: "Core Function",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/blob-be844d0.png/:/cr=t:0%25,l:0.89%25,w:98.22%25,h:98.22%25/rs=w:720,cg:true,m",
    alt: "Warehouse core functions and process flow",
    points: [
      "Logistics integration",
      "Receipt",
      "Quality inspection",
      "Incoming storage",
      "Replenishment",
      "Transfer",
      "Inventory",
      "Outbound picking",
      "Loading",
      "Cross lighter",
      "Inventory control",
      "Labor performance appraisal",
      "Integration with automation equipment",
    ],
  },
  {
    id: "warehouse-digitalization",
    title: "Warehouse Management Digitalization",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/digit.jpg/:/cr=t:0%25,l:5.22%25,w:89.57%25,h:89.57%25/rs=w:720,cg:true,m",
    alt: "Warehouse management digitalization",
    points: [
      "Material Management",
      "Inbound Notification / Receiving / Quality Control",
      "Inventory Cycle / Aging Analysis",
      "Inventory",
      "Inventory Visualization / Stock Transfer / Inventory Snapshot",
      "Outbound Notification",
      "Distribution Rules / Replenishment Rules / Inventory Strategy",
      "To-do List & Reminder Board",
    ],
  },
  {
    id: "barcoding-equipment",
    title: "Warehouse Barcoding Equipment",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Material.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:720,cg:true",
    alt: "Warehouse barcoding equipment",
    points: [
      "PDA",
      "Labels",
      "RFID Reader",
      "Label printer",
      "Dashboard",
      "Wireless Access point",
    ],
  },
  {
    id: "automation-equipment",
    title: "Warehouse Automation Equipment",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Material.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:720,cg:true",
    alt: "Warehouse automation equipment",
    points: [
      "Stacker",
      "AGV",
      "Forklift",
      "Conveyor",
      "Lifter",
      "Industrial Robots",
    ],
  },
];

const heroHighlights = [
  { value: "4", label: "Power plant workflows" },
  { value: "5", label: "Warehouse solution blocks" },
  { value: "11", label: "Operational entry points" },
];

function SectionBlock({ item, index, label }) {
  return (
    <section id={item.id} className="two-column" style={{ padding: "40px 0" }}>
      <div className={`image-frame gs-reveal ${index % 2 ? "order-2" : ""}`} style={{ background: "#f3f6f8" }}>
        <Image
          src={item.image}
          alt={item.alt}
          width={720}
          height={540}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="image-number">{String(index + 1).padStart(2, "0")}</div>
      </div>

      <div className="gs-reveal" style={{ order: index % 2 ? 1 : 2 }}>
        <span className="accent-bar" />
        <p className="eyebrow">{label}</p>
        <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>{item.title}</h2>
        <ul className="detail-list">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const mainRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroPanelRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({ delay: 0.12 });

    if (heroLabelRef.current) {
      heroTimeline.fromTo(
        heroLabelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    if (heroHeadlineRef.current) {
      heroTimeline.fromTo(
        heroHeadlineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        "-=0.2"
      );
    }

    if (heroCopyRef.current) {
      heroTimeline.fromTo(
        heroCopyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.35"
      );
    }

    if (heroActionsRef.current) {
      heroTimeline.fromTo(
        heroActionsRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (heroPanelRef.current) {
      heroTimeline.fromTo(
        heroPanelRef.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );
    }

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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef}>
      <section className="page-hero dark solutions-hero">
        <div className="hero-grid" />
        <div className="shell page-hero-inner solutions-hero-inner">
          <div className="solutions-hero-copy">
            <p className="eyebrow" ref={heroLabelRef}>
              Solutions
            </p>
            <h1 ref={heroHeadlineRef}>Power Plant Automation and Warehouse Logistics</h1>
            <p className="hero-copy" ref={heroCopyRef}>
              Automation architecture for generation assets and material movement,
              built to improve visibility, control discipline, and operating
              throughput across critical industrial environments.
            </p>

            <div className="hero-actions" ref={heroActionsRef}>
              <a href="#boiler-automation" className="button primary">
                Explore Power Plant
              </a>
              <a href="#system-main-functions" className="button secondary light">
                Explore Warehouse
              </a>
              <Link href="/contact" className="button secondary light">
                Discuss Your Scope
              </Link>
            </div>

            <div className="solutions-hero-stats">
              {heroHighlights.map((item) => (
                <div className="solutions-hero-stat" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="solutions-hero-panel" ref={heroPanelRef}>
            <div className="solutions-hero-card">
              <span className="card-label">Coverage</span>
              <h2>From boiler control to digitally managed warehouse flow</h2>
              <p>
                The page brings both operating domains into one structured view so
                teams can move quickly from high-level scope to specific solution
                areas.
              </p>
            </div>

            <div className="solutions-hero-visual">
              <Image
                src="/images/engg 1.png"
                alt="Industrial automation engineering"
                width={900}
                height={1040}
                sizes="(max-width: 1024px) 100vw, 32vw"
              />
              <div className="solutions-hero-overlay">
                <span>Includes</span>
                <p>Boiler, turbine, ash handling, inventory flow, barcoding, and automation equipment integration.</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="shell">
          <div className="tag-row left solutions-hero-tags">
            {[...powerPlantSections, ...warehouseSections].map((section) => (
              <a className="industry-tag" href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-center gs-reveal" style={{ marginBottom: "40px" }}>
          <span className="accent-bar center" />
          <p className="eyebrow">Through Our Partners</p>
          <h2>Power Plant Automation</h2>
          <p className="section-copy" style={{ maxWidth: "860px", margin: "0 auto" }}>
            Process-focused automation for boiler systems, turbine control, fuel and ash handling, and water-steam cycle management across modern power facilities.
          </p>
        </div>

        <div className="shell stack-grid">
          {powerPlantSections.map((item, index) => (
            <SectionBlock key={item.id} item={item} index={index} label="Power Plant Automation" />
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell section-center gs-reveal" style={{ marginBottom: "40px" }}>
          <span className="accent-bar center" />
          <p className="eyebrow">Through Our Partners</p>
          <h2>Warehouse Logistic Solutions</h2>
          <p className="section-copy" style={{ maxWidth: "860px", margin: "0 auto" }}>
            Integrated warehouse planning, inventory control, digitalization, barcoding, and automation workflows designed to improve visibility, throughput, and operational discipline.
          </p>
        </div>

        <div className="shell stack-grid">
          {warehouseSections.map((item, index) => (
            <SectionBlock key={item.id} item={item} index={index} label="Warehouse Logistics" />
          ))}
        </div>
      </section>
    </div>
  );
}
