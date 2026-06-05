"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

function buildSectionModels(sections) {
  const totals = new Map();
  sections.forEach((section) => {
    const title = section.title.trim();
    totals.set(title, (totals.get(title) || 0) + 1);
  });

  const seen = new Map();
  return sections.map((section, index) => {
    const title = section.title.trim();
    const occurrence = (seen.get(title) || 0) + 1;
    seen.set(title, occurrence);
    const duplicateCount = totals.get(title) || 1;

    return {
      ...section,
      key: `${title}-${index}`,
      index,
      navTitle: duplicateCount > 1 ? `${title} - ${occurrence}` : title,
    };
  });
}

export function DetailContentBrowser({
  record,
  kind,
  searchPlaceholder,
  panelLabel,
  itemLabel,
  listHeading,
  ctaTitle,
  ctaCopy,
  ctaHref,
  ctaLabel,
  backHref,
  backLabel,
}) {
  const [query, setQuery] = useState("");
  const detailPanelRef = useRef(null);
  const sections = record.content?.sections ?? [];
  const sectionModels = useMemo(() => buildSectionModels(sections), [sections]);
  const [activeKey, setActiveKey] = useState(sectionModels[0]?.key || "");

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sectionModels;

    return sectionModels.filter((section) => {
      return section.title.toLowerCase().includes(normalizedQuery);
    });
  }, [query, sectionModels]);

  useEffect(() => {
    if (!filteredSections.length) return;
    if (!filteredSections.some((section) => section.key === activeKey)) {
      setActiveKey(filteredSections[0].key);
    }
  }, [activeKey, filteredSections]);

  useEffect(() => {
    if (filteredSections[0]) {
      setActiveKey(filteredSections[0].key);
    }
  }, [query]);

  useEffect(() => {
    if (!detailPanelRef.current) return;
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeKey, query]);

  const activeSection = filteredSections.find((section) => section.key === activeKey) || filteredSections[0];

  return (
    <>
      <section className="section catalog-detail-section">
        <div className="shell">
          <div className="catalog-detail-summary gs-reveal">
            <div>
              <span className="accent-bar" />
              <p className="eyebrow">{kind}</p>
              <h2>{record.title}</h2>
            </div>
            <p>{record.description}</p>
          </div>

          <div className="catalog-search gs-reveal">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                Clear
              </button>
            ) : null}
          </div>

          {filteredSections.length === 0 ? (
            <div className="catalog-empty-state gs-reveal">
              <h3>No matching sections</h3>
              <p>Try a broader keyword or clear the search field.</p>
            </div>
          ) : (
            <div className="catalog-detail-browser gs-reveal">
              <aside className="catalog-detail-nav" aria-label={listHeading}>
                <div className="catalog-detail-nav-heading">
                  <span>{listHeading}</span>
                  <strong>{filteredSections.length}</strong>
                </div>
                {filteredSections.map((section, index) => (
                  <button
                    type="button"
                    key={section.key}
                    className={section.key === activeSection.key ? "active" : ""}
                    onClick={() => setActiveKey(section.key)}
                  >
                    <span>{itemLabel} {String(section.index + 1).padStart(2, "0")}</span>
                    <strong title={section.navTitle}>{section.navTitle}</strong>
                  </button>
                ))}
              </aside>

              <article className="catalog-detail-panel" ref={detailPanelRef}>
                <div className="catalog-detail-panel-header-row">
                  <div className="catalog-detail-image">
                    <Image
                      src={activeSection.image || record.image}
                      alt={activeSection.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className="catalog-media-image"
                    />
                  </div>
                  <div className="catalog-detail-panel-header-text">
                    <div className="catalog-detail-panel-top">
                      <span>{panelLabel}</span>
                      <strong>{itemLabel} {String(activeSection.index + 1).padStart(2, "0")}</strong>
                    </div>
                    <h2>{activeSection.title}</h2>
                  </div>
                </div>

                <div className="catalog-detail-panel-copy">
                  {activeSection.text ? <p style={{ whiteSpace: "pre-line" }}>{activeSection.text}</p> : null}

                  {activeSection.items?.length ? (
                    <div className="catalog-detail-list-block">
                      <h3>{kind === "Product" ? "Options and features" : "Features and deliverables"}</h3>
                      <ul className="detail-list">
                        {activeSection.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          )}
        </div>
      </section>

      <section className="section catalog-detail-cta">
        <div className="shell section-center gs-reveal">
          <span className="accent-bar center" />
          <h2>{ctaTitle}</h2>
          <p className="cta-copy">{ctaCopy}</p>
          <div className="hero-actions center">
            <Link href={ctaHref} className="button primary">
              {ctaLabel}
            </Link>
            <Link href={backHref} className="button secondary">
              {backLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
