import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand-mark">
            <Image
              src="/images/Logo/LOGO.png"
              alt="Orvion IntelliAct Automation"
              width={170}
              height={56}
              className="logo-img"
            />
          </Link>
          <p>
            Precision automation solutions engineered for modern industrial operations.
          </p>
        </div>

        <div>
          <p className="footer-heading">Solutions</p>
          <div className="footer-links">
            <Link href="/solutions/refinery-terminals">Refinery & Terminals</Link>
            <Link href="/solutions/power-warehouse">Power & Energy</Link>
            <Link href="/solutions/chemical-pharma">Chemical & Pharma</Link>
            <Link href="/solutions/water-scada">Water SCADA</Link>
            <Link href="/solutions/compressor-control-system">Compressor Control</Link>
          </div>
        </div>

        <div>
          <p className="footer-heading">Products</p>
          <div className="footer-links">
            <Link href="/products/control-safety-system">Control Systems</Link>
            <Link href="/products/field-instruments">Field Instruments</Link>
            <Link href="/products/flow-level-instruments">Flow & Level</Link>
            <Link href="/products/gas-detector">Gas Detection</Link>
            <Link href="/products/electrical">Electrical</Link>
          </div>
        </div>

        <div>
          <p className="footer-heading">Company</p>
          <div className="footer-links">
            <Link href="/company/about-us">About Us</Link>
            <Link href="/company/leadership">Leadership</Link>
            <Link href="/company/certification">Certifications</Link>
            <Link href="/company/why-intelliact">Why IntelliAct</Link>
            <Link href="/company/quality-policy">Quality Policy</Link>
            <Link href="/company/hse-policy">HSE Policy</Link>
            <Link href="/company/careers">Careers</Link>
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>&copy; 2026 Orvion IntelliAct Automation Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
