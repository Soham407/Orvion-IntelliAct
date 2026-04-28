"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const productSections = [
  {
    id: "scada",
    title: "SCADA",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/SCADA-9ef8222.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "SCADA application overview across oil and gas, pipeline, tank farm, utilities, and batch production",
    text:
      "Supcon InPlant SCADA software supports C/S structure, B/S structure, and stand-alone monitoring. Based on network planning and business needs, servers and clients can run on the same machine or be distributed across different computers and networks. This flexibility supports Pipeline SCADA, Oil & Gas SCADA, Terminal Automation SCADA, General SCADA, and Pharma/Water SCADA environments.",
  },
  {
    id: "dcs",
    title: "DCS",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/DCS-05ed6c4.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "DCS control cabinets and equipment racks",
    text:
      "Webfield ECS-700 supports up to 32 project management capabilities, 60 control domains, and 128 operational domain management, with each domain accommodating 60 stations. Each control station is designed to manage 4,000 I/Os. Webfield JX-300XP simplifies architecture for small to medium enterprises while improving reliability, integrity, and stability, and supports cross-region data acquisition and control.",
  },
  {
    id: "plc",
    title: "PLC",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/PLC-bf768c6.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "PLC and RTU devices including G5 Pro and G3 Smart",
    text:
      "The GCS-G3 features a highly compact design for small-point stand-alone control and supports field installation in harsh environments. The GCS-G5 adopts a UCP communication network with full redundancy and easy-to-use networking, making it suitable for decentralized sites ranging from a single machine to projects spread across cities or regions.",
  },
  {
    id: "rtu",
    title: "RTU",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/RTU-8db028a.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "RTU modules and industrial automation hardware",
    text:
      "The G3 RTU uses a compact structure and small-point stand-alone control approach, making it well suited for harsh field environments and high-density distributed applications across industrial automation systems.",
  },
  {
    id: "safety-plc",
    title: "Safety PLC",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Safety%20PLC-a1c7c60.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "Safety PLC hardware including TCS-900 and TCS-500",
    text:
      "Webfield TCS-900 (SIL-3) is designed to protect personnel, assets, and production processes across Emergency Shutdown Systems, Fire & Gas Systems, Compressor Control Systems, HIPPS, and Burner Management Systems. It is suited for oil and gas, refining, petrochemicals, chemicals, power, metallurgy, and machinery applications.",
  },
  {
    id: "isolator",
    title: "SIL3 Barrier / Isolator",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/Safety%20Barrier-56f0c7c.jpg/:/rs=w:480,h:361,cg:true,m/cr=w:480,h:361",
    alt: "SIL3 certified barrier and isolator modules",
    text:
      "The HD5500 (SIL3 Certified) isolated barrier series is designed to protect electrical signals in hazardous areas. Models are available for digital input, analog input, analog output, frequency or pulse input, solenoid driver, and temperature converter applications, including HART support.",
  },
  {
    id: "relays",
    title: "SIL3 Relays",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/SIL3%20Relay-8b4e804.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "SIL3 certified relay modules",
    text:
      "The HD2000 (SIL3 Certified) handles switch signals across a wide 16V to 35VDC range. It uses triple redundancy, automatic protection, and contact melting protection to provide safe isolation for single-loop and double-loop operation, including line and loop monitoring options.",
  },
  {
    id: "hart",
    title: "HART Communicator",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/HART-4eefdf9.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "Handheld HART communicator and calibrator",
    text:
      "The SupX600 interactive calibrator and communicator is a handheld tool with a capacitive full-touch screen and 1080P display. It combines an intelligent process calibrator with a HART communicator, and its separable operation design makes on-site work more practical and efficient.",
  },
  {
    id: "surge",
    title: "Surge Protection Device",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/SPD-d84ffdb.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "Surge protection devices and protection accessories",
    text:
      "The S Pro and P Pro SPD series provides surge protection for field equipment such as sensors, transmitters, flow meters, solenoid valves, RTD, TC, FF, APL field meters, and communication interfaces including RS485 and RS232. It also protects I/O interfaces across PLC, DCS, FGS, and ESD systems, with options for single-phase and three-phase applications.",
  },
  {
    id: "universal",
    title: "Universal Control System",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/blob-3450fda.png/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "APL and SmartEIO universal control system components",
    text:
      "This architecture brings the complete plant automation layer into a single cabinet with cloud-based, fully digitalized software. It helps reduce field cabling and on-site hardware while simplifying deployment and maintenance.",
  },
  {
    id: "remote-io",
    title: "Smart Remote IO / EIO",
    image:
      "https://img1.wsimg.com/isteam/ip/e5e1f2a6-28cb-4358-bddc-d0b930b52682/rEMOTE%20io-00625f1.jpg/:/cr=t:0%25,l:0.96%25,w:98.09%25,h:100%25/rs=w:480,h:361,cg:true",
    alt: "Smart remote IO and EIO cabinet installation",
    text:
      "The Smart Remote IO / EIO setup is designed for direct field installation, simplifying distributed control architecture and improving implementation efficiency across industrial automation and SCADA systems.",
  },
];

const productHeroHighlights = [
  { value: "11", label: "Product modules" },
  { value: "SIL3", label: "Safety coverage" },
  { value: "SCADA to EIO", label: "Control stack span" },
];

export default function ProductsPage() {
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
      <section className="page-hero dark products-hero">
        <div className="hero-grid" />
        <div className="shell page-hero-inner products-hero-inner">
          <div className="products-hero-copy">
            <p className="eyebrow" ref={heroLabelRef}>
              Products
            </p>
            <h1 ref={heroHeadlineRef}>Control and Safety System</h1>
            <p className="hero-copy" ref={heroCopyRef}>
              A consolidated control-layer portfolio covering supervision,
              distributed control, programmable control, safety integrity, signal
              isolation, surge protection, and field-ready remote I/O deployment.
            </p>

            <div className="hero-actions" ref={heroActionsRef}>
              <a href="#scada" className="button primary">
                Explore Control Stack
              </a>
              <a href="#safety-plc" className="button secondary light">
                Explore Safety Layer
              </a>
              <Link href="/contact" className="button secondary light">
                Discuss Product Fit
              </Link>
            </div>

            <div className="products-hero-stats">
              {productHeroHighlights.map((item) => (
                <div className="products-hero-stat" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="products-hero-panel" ref={heroPanelRef}>
            <div className="products-hero-card">
              <span className="card-label">Portfolio View</span>
              <h2>From SCADA and DCS to certified safety and field protection</h2>
              <p>
                This opening section now frames the page as a connected product
                stack, making it easier to understand how each module fits the
                broader automation and protection architecture.
              </p>
            </div>

            <div className="products-hero-visual">
              <Image
                src="/images/chemical 1.png"
                alt="Industrial control and safety systems"
                width={900}
                height={560}
                sizes="(max-width: 1024px) 100vw, 32vw"
              />
              <div className="products-hero-overlay">
                <span>Includes</span>
                <p>SCADA, DCS, PLC, RTU, safety PLC, SIL3 barriers and relays, HART tools, surge protection, and remote I/O.</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="shell">
          <div className="tag-row left products-hero-tags">
            {productSections.map((section) => (
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
          <p className="eyebrow">Product Overview</p>
          <h2>Control and Safety Systems Products</h2>
          <p className="section-copy" style={{ maxWidth: "860px", margin: "0 auto" }}>
            This page consolidates the original Control and Safety System product content into a single client-facing page, so your navigation now cleanly presents Home, Solutions, and Products only.
          </p>
        </div>

        <div className="shell stack-grid">
          {productSections.map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              className="two-column"
              style={{ padding: "40px 0" }}
            >
              <div
                className={`image-frame gs-reveal ${index % 2 ? "order-2" : ""}`}
                style={{ background: "#f3f6f8" }}
              >
                <Image
                  src={section.image}
                  alt={section.alt}
                  width={480}
                  height={361}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="image-number">{String(index + 1).padStart(2, "0")}</div>
              </div>

              <div className="gs-reveal" style={{ order: index % 2 ? 1 : 2 }}>
                <span className="accent-bar" />
                <p className="eyebrow">Product Module</p>
                <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>{section.title}</h2>
                <p className="section-copy">{section.text}</p>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
