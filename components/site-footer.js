import Image from "next/image";
import Link from "next/link";

const officeAddress = [
  "804, The Cosmopolis Building",
  "Opp. Seasons Mall, Hadapsar, Magarpatta",
  "Pune, 411028, India",
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=804%20The%20Cosmopolis%20Building%20Opp%20Seasons%20Mall%20Hadapsar%20Magarpatta%20Pune%20411028%20India";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        {/* Column 1: Brand */}
        <div className="footer-brand">
          <Link href="/" className="brand-mark">
            <Image
              src="/images/Logo/LOGO.avif"
              alt="Orvion IntelliAct Automation"
              width={170}
              height={56}
              className="logo-img"
            />
          </Link>
          <p>
            Precision automation solutions engineered for modern industrial operations.
          </p>
          <div className="footer-social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="footer-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Solutions */}
        <div>
          <p className="footer-heading">Solutions</p>
          <div className="footer-links">
            <Link href="/solutions/refinery-terminals">Refinery & Terminals</Link>
            <Link href="/solutions/power-warehouse">Power & Energy</Link>
            <Link href="/solutions/chemical-pharma">Chemical & Pharma</Link>
            <Link href="/solutions/water-scada">Water SCADA</Link>
            <Link href="/solutions/compressor-control-system">Compressor Control</Link>
            <Link href="/solutions/machine-monitoring">Machine Monitoring</Link>
            <Link href="/solutions/optimization-solutions">Process Optimization</Link>
            <Link href="/solutions/cloud-solutions">Cloud Solutions</Link>
          </div>
        </div>

        {/* Column 3: Products */}
        <div>
          <p className="footer-heading">Products</p>
          <div className="footer-links">
            <Link href="/products/control-safety-system">Control System</Link>
            <Link href="/products/field-instruments">Field Instruments</Link>
            <Link href="/products/flow-level-instruments">Flow Meter and Instruments</Link>
            <Link href="/products/advanced-layer">Advanced Product Layer</Link>
            <Link href="/products/software">Software's</Link>
            <Link href="/products/electrical">Electrical</Link>
            <Link href="/products/gas-detector">Flame and Gas Detector</Link>
            <Link href="/products/fire-alarm-system">Fire Alarm &amp; Life Safety</Link>
            <Link href="/products/analyser">Industrial Analysers</Link>
            <Link href="/products/cloud-solutions">Cloud AI &amp; Autonomy</Link>
          </div>
        </div>

        {/* Column 4: Company */}
        <div>
          <p className="footer-heading">Company</p>
          <div className="footer-links">
            <Link href="/company/about-us">About Us</Link>
            <Link href="/company/company-profile">Company Profile</Link>
            <Link href="/company/vision-mission">Vision &amp; Mission</Link>
            <Link href="/company/leadership">Leadership</Link>
            <Link href="/company/why-intelliact">Why Choose Us</Link>
            <Link href="/company/certification">Certifications</Link>
            <Link href="/company/quality-policy">Quality Policy</Link>
            <Link href="/company/hse-policy">HSE Policy</Link>
            <Link href="/company/careers">Careers</Link>
            <Link href="/employee-portal">Employee Portal</Link>
          </div>
        </div>

        {/* Column 5: Contact */}
        <div>
          <p className="footer-heading">Contact</p>
          <div className="footer-links">
            <a href="mailto:info@intelliactind.com" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              info@intelliactind.com
            </a>
            <a href="mailto:sales@intelliactind.com" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              sales@intelliactind.com
            </a>
            <a href="mailto:Careers@intelliactind.com" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              Careers@intelliactind.com
            </a>
            <a href="tel:+919890200799" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 98902 00799
            </a>
            <div style={{ marginTop: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px" }}>
              {officeAddress.map((line) => (
                <span key={line} style={{ display: "block", color: "rgba(255, 255, 255, 0.65)", fontSize: "0.8rem", marginBottom: "4px" }}>{line}</span>
              ))}
            </div>
            <a href={mapUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", marginTop: "4px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>&copy; 2026 Orvion IntelliAct Automation. All rights reserved.</p>
      </div>
    </footer>
  );
}
