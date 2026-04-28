"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PageHero } from "../../components/page-hero";

export default function ContactPage() {
  const mainRef = useRef(null);

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
  }, []);

  return (
    <div ref={mainRef}>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Our Expert Team"
        description="Whether you have a technical inquiry or a project requirement, we are here to provide the engineering support you need."
      />

      <section className="section">
        <div className="shell grid-two">
          <div className="gs-reveal">
            <span className="accent-bar" />
            <h2>Contact Information</h2>
            <div className="stack-copy" style={{ marginTop: '32px' }}>
              <div className="contact-item mb-8">
                <p className="mini-label">Email</p>
                <a href="mailto:info@intelliactind.com" className="h3">info@intelliactind.com</a>
              </div>
              <div className="contact-item mb-8">
                <p className="mini-label">Phone</p>
                <p className="h3">+91 98902 00799 / 99705 92052</p>
              </div>
              <div className="contact-item mb-8">
                <p className="mini-label">Head Office</p>
                <p className="h3">Pune, Maharashtra, India</p>
                <p>804, The Cosmopolis Building, Pune, 411028</p>
              </div>
              <div className="contact-item mb-8">
                <p className="mini-label">Branch Office</p>
                <p className="h3">Chennai, India</p>
              </div>
            </div>
          </div>

          <div className="gs-reveal panel-card">
            <h3>Send us a Message</h3>
            <p className="mb-8">Fill out the form below and one of our automation specialists will get back to you shortly.</p>
            
            <form className="contact-form">
              <div className="input-group mb-4">
                <label className="mini-label">Full Name</label>
                <input type="text" placeholder="Your Name" className="w-full p-4 rounded bg-white border border-slate-200" />
              </div>
              <div className="input-group mb-4">
                <label className="mini-label">Email Address</label>
                <input type="email" placeholder="email@example.com" className="w-full p-4 rounded bg-white border border-slate-200" />
              </div>
              <div className="input-group mb-4">
                <label className="mini-label">Subject</label>
                <input type="text" placeholder="Project Inquiry" className="w-full p-4 rounded bg-white border border-slate-200" />
              </div>
              <div className="input-group mb-6">
                <label className="mini-label">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full p-4 rounded bg-white border border-slate-200"></textarea>
              </div>
              <button type="submit" className="button primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell section-center gs-reveal">
          <p className="eyebrow">Manufacturing Presence</p>
          <h2>Shared Factory Infrastructure</h2>
          <p className="section-copy">
            Our specialized manufacturing and assembly facilities span over 1,13,000 Sq. ft., 
            equipped to handle turnkey automation projects and large-scale control system assembly.
          </p>
        </div>
      </section>
    </div>
  );
}
