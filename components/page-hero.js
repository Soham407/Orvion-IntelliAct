"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageHero({ eyebrow, title, description, children, dark = true }) {
  const headlineRef = useRef(null);
  const labelRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    if (headlineRef.current) {
      const text = headlineRef.current.innerText;
      const words = text.split(" ");
      headlineRef.current.innerHTML = words
        .map(
          (word) =>
            `<span class="word-outer"><span class="word-inner">${word}</span></span>`
        )
        .join(" ");

      const innerWords = headlineRef.current.querySelectorAll(".word-inner");

      const tl = gsap.timeline({ delay: 0.1 });
      
      tl.fromTo(labelRef.current, 
        { y: 16, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(innerWords, 
        { y: "115%" }, 
        { y: "0%", duration: 0.7, stagger: 0.055, ease: "power3.out" }, 
        "-=0.2"
      )
      .fromTo(subRef.current, 
        { y: 16, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
        "-=0.3"
      );
    }
  }, []);

  return (
    <section className={dark ? "page-hero dark" : "page-hero"}>
      <div className="hero-grid" />
      <div className="shell page-hero-inner">
        <p className="eyebrow" ref={labelRef}>{eyebrow}</p>
        <h1 ref={headlineRef}>{title}</h1>
        {description ? (
          <p className="hero-copy" ref={subRef}>
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
