"use client";

import Image from "next/image";
import Link from "next/link";

export function CatalogDirectory({ items, type, eyebrow, title, description, ctaLabel }) {
  return (
    <section className="section catalog-directory-section">
      <div className="shell">
        <div className="catalog-directory-intro gs-reveal">
          <span className="accent-bar" />
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="catalog-directory-grid">
          {items.map((item, index) => {
            const sections = item.content?.sections ?? [];
            return (
              <article className="catalog-card gs-reveal" key={item.slug}>
                <Link href={`/${type}/${item.slug}`} className="catalog-card-media" aria-label={item.title}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
                    className="catalog-media-image"
                  />
                  <span className="catalog-card-index">
                    {type === "products" ? "Product" : "Solution"} {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>

                <div className="catalog-card-body">
                  <div>
                    <p className="catalog-card-meta">{sections.length} focus areas</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  {sections.length ? (
                    <div className="catalog-chip-row" aria-label={`${item.title} focus areas`}>
                      {sections.slice(0, 3).map((section) => (
                        <span key={section.title}>{section.title}</span>
                      ))}
                      {sections.length > 3 ? <span>+{sections.length - 3} more</span> : null}
                    </div>
                  ) : null}

                  <Link href={`/${type}/${item.slug}`} className="catalog-card-link">
                    {ctaLabel}
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
