"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CatalogHero } from "../../../components/catalog-hero";
import { companyPages } from "../../../lib/company-data";

function getCompanyImageVariant(pageSlug, image) {
  if (pageSlug === "leadership") return "portrait";
  if (
    pageSlug === "certification" ||
    pageSlug === "quality-policy" ||
    pageSlug === "hse-policy" ||
    image?.includes("1 year") ||
    image?.includes("policy")
  ) {
    return "document";
  }
  return "standard";
}

function CareersApplicationForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!resume) {
      setStatus({ type: "error", message: "Please attach your resume/CV before submitting." });
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("resume", resume);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your application.");
      }

      setFormState({ name: "", email: "", phone: "", position: "", message: "" });
      setResume(null);
      const fileInput = document.getElementById("career-resume");
      if (fileInput) fileInput.value = "";
      setStatus({
        type: "success",
        message: "Application submitted successfully. Our team will review your resume.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your application. Please email Careers@intelliactind.com directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section section-soft careers-apply-section">
      <div className="shell contact-main-grid">
        <div className="gs-reveal">
          <span className="accent-bar" />
          <p className="eyebrow">Careers</p>
          <h2>Apply with your resume/CV</h2>
          <p className="section-copy">
            Share your profile for automation, control systems, instrumentation,
            engineering, and project execution roles. Applications are emailed to
            Careers@intelliactind.com with your resume attached.
          </p>
        </div>

        <div className="gs-reveal panel-card contact-form-card">
          <span className="card-label">Job Application</span>
          <h3>Submit your profile</h3>

          {status.message ? (
            <div
              className={status.type === "success" ? "upload-success-toast" : "portal-error"}
              style={{ marginBottom: 20 }}
            >
              {status.type === "success" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              {status.message}
            </div>
          ) : null}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="input-group">
                <label className="mini-label" htmlFor="career-name">Full Name *</label>
                <input
                  id="career-name"
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="mini-label" htmlFor="career-email">Email Address *</label>
                <input
                  id="career-email"
                  type="email"
                  className="contact-input"
                  placeholder="email@example.com"
                  value={formState.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="mini-label" htmlFor="career-phone">Phone Number *</label>
                <input
                  id="career-phone"
                  type="tel"
                  className="contact-input"
                  placeholder="+91"
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="mini-label" htmlFor="career-position">Role / Position</label>
                <input
                  id="career-position"
                  type="text"
                  className="contact-input"
                  placeholder="Automation Engineer"
                  value={formState.position}
                  onChange={(event) => updateField("position", event.target.value)}
                />
              </div>
              <div className="input-group input-group-full">
                <label className="mini-label" htmlFor="career-resume">Resume / CV *</label>
                <label className="resume-upload-control" htmlFor="career-resume">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M14 2v6h6M12 18v-6m-3 3 3-3 3 3" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{resume ? resume.name : "Choose PDF, DOC, or DOCX file"}</span>
                </label>
                <input
                  id="career-resume"
                  type="file"
                  className="resume-upload-input"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => setResume(event.target.files?.[0] || null)}
                  required
                />
                <p className="form-helper-text">
                  Attach one resume/CV file. Applications are emailed to Careers@intelliactind.com.
                </p>
              </div>
              <div className="input-group input-group-full">
                <label className="mini-label" htmlFor="career-message">Message</label>
                <textarea
                  id="career-message"
                  rows="5"
                  className="contact-input contact-textarea"
                  placeholder="Tell us about your experience, preferred role, or availability."
                  value={formState.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </div>
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="button primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
              <a href="mailto:Careers@intelliactind.com" className="button secondary contact-alt-action">
                Email Instead
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

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
      <CatalogHero
        eyebrow="Company Information"
        title={page.title}
        description={page.description}
        image={page.image}
        imageAlt={page.title}
        stats={[`${page.content?.sections?.length || 0} sections`, "Company overview", "Direct contact available"]}
      />

      {page.content.sections.map((section, idx) => (
        <section 
          key={idx} 
          className={idx % 2 === 0 ? "section section-white" : "section section-soft"}
        >
          <div className="shell two-column">
            <div className={`gs-reveal ${idx % 2 === 1 ? "order-2" : ""}`}>
              <span className="accent-bar" />
              <p className="eyebrow">Details 0{idx + 1}</p>
              <h2 className="mb-6">{section.title}</h2>
              {section.text && section.text.split("\n\n").map((para, paraIdx) => (
                <p key={paraIdx} className="section-copy mb-6" style={{ whiteSpace: "pre-line" }}>
                  {para}
                </p>
              ))}
              {section.items && section.items.length > 0 && (
                <ul className="detail-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
              <div
                className={`image-frame company-image-frame company-image-${getCompanyImageVariant(page.slug, section.image)} gs-reveal ${idx % 2 === 1 ? "order-1" : ""}`}
              >
                <Image
                  src={section.image || page.image}
                alt={section.title}
                width={900}
                height={700}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.srcset = "";
                  e.target.src = page.image; // Fallback to main page image if specific one missing
                }}
              />
              <div className="image-number">0{idx + 1}</div>
            </div>
          </div>
        </section>
      ))}

      {page.slug === "careers" ? <CareersApplicationForm /> : null}

      <section className="section">
        <div className="shell section-center gs-reveal">
          <span className="accent-bar center" />
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
