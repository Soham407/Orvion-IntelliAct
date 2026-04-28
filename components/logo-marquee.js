import Image from "next/image";

export function LogoMarquee({ title, eyebrow, logos, reverse = false, pauseOnHover = true, className = "" }) {
  if (!logos || logos.length === 0) return null;
  
  // Triple for smoother loop
  const repeated = [...logos, ...logos, ...logos];

  return (
    <section className={`logo-strip ${className}`}>
      <div className="shell">
        {(eyebrow || title) && (
          <div className="section-center gs-reveal" style={{ marginBottom: '40px' }}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="logo-strip-title">{title}</h2>}
          </div>
        )}
      </div>
      
      <div className={`logo-marquee-container ${pauseOnHover ? 'pause-on-hover' : ''}`}>
        <div className={reverse ? "logo-track reverse" : "logo-track"}>
          {repeated.map((logo, index) => (
            <div className="logo-card" key={`${logo.src}-${index}`}>
              <img
                src={logo.src}
                alt={index < logos.length ? logo.alt : ""}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
