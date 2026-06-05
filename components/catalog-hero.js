"use client";

import Image from "next/image";

export function CatalogHero({ eyebrow, title, description, image, imageAlt, stats = [] }) {
  return (
    <section className="catalog-hero">
      <div className="hero-grid" />
      <div className="shell catalog-hero-inner">
        <div className="catalog-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {stats.length ? (
            <div className="catalog-hero-stats">
              {stats.map((stat) => (
                <span key={stat}>{stat}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="catalog-hero-media">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
