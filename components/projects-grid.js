"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const filters = [
  { key: "all", label: "All Projects" },
  { key: "plc", label: "PLC and Controls" },
  { key: "scada", label: "SCADA and HMI" },
  { key: "process", label: "Process Automation" },
  { key: "electrical", label: "Electrical" },
  { key: "iot", label: "Industrial IoT" },
];

export function ProjectsGrid({ projects }) {
  const [active, setActive] = useState("all");

  const visible = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => project.category === active);
  }, [active, projects]);

  return (
    <section className="section">
      <div className="shell">
        <div className="filter-row">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={active === filter.key ? "filter-chip active" : "filter-chip"}
              onClick={() => setActive(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((project) => (
            <article className="project-card" key={`${project.title}-${project.category}`}>
              <div className="project-media">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={720}
                  height={520}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <span className="project-badge">{project.label}</span>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="project-meta">
                  {project.label} • {project.sector}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
