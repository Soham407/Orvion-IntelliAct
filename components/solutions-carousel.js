"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { coreSolutions } from "../lib/site-data";

export function SolutionsCarousel() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 410; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section solutions-section" ref={containerRef}>
      <div className="shell">
        <div className="section-center gs-reveal" style={{ marginBottom: '48px' }}>
          <p className="eyebrow">What We Offer</p>
          <h2>Our Core SOLUTIONS</h2>
        </div>

        <div className="carousel-wrapper gs-reveal">
          <button 
            onClick={() => scroll("left")} 
            className="nav-btn side-btn prev" 
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="carousel-container" ref={scrollRef}>
            <div className="carousel-track">
              {coreSolutions.map((solution, index) => (
                <article className="solution-card" key={index}>
                  <div className="solution-image">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="solution-content">
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <Link href={solution.link} className="learn-more">
                      Learn More
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll("right")} 
            className="nav-btn side-btn next" 
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
