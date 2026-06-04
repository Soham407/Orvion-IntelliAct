"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../components/page-hero";

const contactChannels = [
  {
    label: "General Inquiries",
    title: "info@intelliactind.com",
    detail: "General inquiries, project discussions, and technical coordination.",
    href: "mailto:info@intelliactind.com",
  },
  {
    label: "Sales",
    title: "sales@intelliactind.com",
    detail: "Commercial discussions, proposals, and partner coordination.",
    href: "mailto:sales@intelliactind.com",
  },
  {
    label: "Careers & Job Applications",
    title: "Careers@intelliactind.com",
    detail: "Job applications, internship inquiries, and career opportunities.",
    href: "mailto:Careers@intelliactind.com",
  },
  {
    label: "Call Us",
    title: "+91 98902 00799",
    detail: "Speak directly with our team for active project requirements.",
    href: "tel:+919890200799",
  },
];

const officeLocations = [
  {
    label: "Head Office",
    city: "Pune, Maharashtra",
    lines: [
      "804, The Cosmopolis Building",
      "Opp. Seasons Mall, Hadapsar, Magarpatta",
      "Pune, 411028, India",
    ],
  },
  {
    label: "Regional Presence",
    city: "Chennai, India",
    lines: [
      "Regional coordination for project execution",
      "Support coverage for southern operations",
    ],
  },
];

const engagementNotes = [
  "Industrial automation project inquiries",
  "DCS, PLC, SCADA, and instrumentation scope reviews",
  "Turnkey execution planning and OEM coordination",
  "Warehouse logistics and digital operations workflows",
];

const responsePoints = [
  "Typical response within 1 business day",
  "Technical and commercial screening by specialists",
  "Scope review for brownfield and greenfield programs",
];

export default function ContactPage() {
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="contact-page">
      <PageHero
        eyebrow="Get In Touch"
        title="Talk To Our Automation Team"
        description="Connect with Orvion IntelliAct for industrial automation programs, control-system modernization, warehouse logistics workflows, and execution support across critical facilities."
      />

      <section className="section contact-section">
        <div className="shell contact-intro-grid">
          <div className="gs-reveal">
            <span className="accent-bar" />
            <p className="eyebrow">Direct Access</p>
            <h2>Start with the right channel.</h2>
            <p className="section-copy contact-intro-copy">
              Whether you are defining scope, reviewing a brownfield upgrade, or
              planning a new automation package, our team can route your inquiry
              to the right technical and commercial leads.
            </p>

            <div className="contact-method-grid">
              {contactChannels.map((item) => (
                <a key={item.title} href={item.href} className="contact-method-card">
                  <span className="card-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="gs-reveal panel-card contact-highlights-card">
            <span className="card-label">Best For</span>
            <h3>What to include in your inquiry</h3>
            <ul className="detail-list contact-detail-list">
              {engagementNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-soft contact-section-soft">
        <div className="shell contact-main-grid">
          <div className="gs-reveal contact-office-stack">
            <div className="contact-office-header">
              <span className="accent-bar" />
              <p className="eyebrow">Office Presence</p>
              <h2>Pune headquarters with Chennai support.</h2>
            </div>

            <div className="contact-office-grid">
              {officeLocations.map((office) => (
                <article key={office.label} className="contact-office-card">
                  <span className="card-label">{office.label}</span>
                  <h3>{office.city}</h3>
                  <div className="stack-copy contact-office-copy">
                    {office.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="contact-response-card">
              <span className="card-label">Response Window</span>
              <div className="contact-response-list">
                {responsePoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="gs-reveal panel-card contact-form-card">
            <span className="card-label">Project Inquiry</span>
            <h3>Send us a message</h3>
            <p className="contact-form-copy">
              Share your plant, process, or execution requirement and our team
              will respond with the right next step.
            </p>

            <form className="contact-form">
              <div className="contact-form-grid">
                <div className="input-group">
                  <label className="mini-label" htmlFor="full-name">Full Name</label>
                  <input id="full-name" type="text" placeholder="Your name" className="contact-input" />
                </div>
                <div className="input-group">
                  <label className="mini-label" htmlFor="company-name">Company</label>
                  <input id="company-name" type="text" placeholder="Organization name" className="contact-input" />
                </div>
                <div className="input-group">
                  <label className="mini-label" htmlFor="email-address">Email Address</label>
                  <input id="email-address" type="email" placeholder="email@example.com" className="contact-input" />
                </div>
                <div className="input-group">
                  <label className="mini-label" htmlFor="phone-number">Phone Number</label>
                  <input id="phone-number" type="tel" placeholder="+91" className="contact-input" />
                </div>
                <div className="input-group input-group-full">
                  <label className="mini-label" htmlFor="inquiry-type">Inquiry Type</label>
                  <select id="inquiry-type" className="contact-input contact-select" defaultValue="">
                    <option value="" disabled>Select an inquiry type</option>
                    <option>Industrial automation project</option>
                    <option>Warehouse logistics solution</option>
                    <option>Retrofit or modernization</option>
                    <option>Partnership or OEM collaboration</option>
                    <option>General business inquiry</option>
                  </select>
                </div>
                <div className="input-group input-group-full">
                  <label className="mini-label" htmlFor="message">Project Scope</label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us about the plant, system scope, timelines, or challenges you want to address."
                    className="contact-input contact-textarea"
                  />
                </div>
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="button primary">Send Inquiry</button>
                <Link href="mailto:info@intelliactind.com" className="button secondary contact-alt-action">
                  Email Instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section contact-footprint-section">
        <div className="shell contact-footprint-grid">
          <div className="gs-reveal panel-card contact-footprint-card">
            <span className="card-label">Operational Footprint</span>
            <h3>Execution backed by shared factory infrastructure.</h3>
            <p>
              Our specialized manufacturing and assembly facilities span over
              1,13,000 sq. ft., supporting turnkey automation packages, panel
              integration, and large-scale control-system delivery.
            </p>
          </div>

          <div className="gs-reveal panel-card contact-footprint-card">
            <span className="card-label">Preferred Next Step</span>
            <h3>Need a faster route?</h3>
            <p>
              For urgent requirements, call the team directly or email a brief
              scope note with plant type, control platform, and timeline so we
              can route your inquiry quickly.
            </p>
            <div className="hero-actions contact-actions">
              <a href="tel:+919890200799" className="button primary">Call Now</a>
              <a href="mailto:info@intelliactind.com" className="button secondary contact-alt-action">
                Email Brief
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
