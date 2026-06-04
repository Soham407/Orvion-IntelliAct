"use client";

import { useState, useEffect } from "react";
import { PageHero } from "../../components/page-hero";

// Sample company documents (in production, these would come from a database/CMS)
const companyDocuments = [
  {
    id: 1,
    title: "Company Policy Manual",
    description: "Comprehensive guidelines covering company policies, code of conduct, and employee expectations.",
    category: "policy",
    type: "PDF",
    size: "2.4 MB",
    updated: "Jan 2026",
  },
  {
    id: 2,
    title: "HSE Policy",
    description: "Health, Safety, and Environment policy document outlining safety standards and procedures.",
    category: "safety",
    type: "PDF",
    size: "1.8 MB",
    updated: "Mar 2026",
  },
  {
    id: 3,
    title: "Quality Policy",
    description: "Quality management standards, ISO compliance requirements, and quality assurance procedures.",
    category: "quality",
    type: "PDF",
    size: "1.2 MB",
    updated: "Feb 2026",
  },
  {
    id: 4,
    title: "Employee Handbook",
    description: "Complete handbook covering leave policies, benefits, grievance procedures, and workplace guidelines.",
    category: "hr",
    type: "PDF",
    size: "3.1 MB",
    updated: "Apr 2026",
  },
  {
    id: 5,
    title: "IT & Data Security Policy",
    description: "Information security guidelines, acceptable use policy, and data protection standards.",
    category: "policy",
    type: "PDF",
    size: "980 KB",
    updated: "May 2026",
  },
  {
    id: 6,
    title: "Travel & Expense Policy",
    description: "Guidelines for business travel, expense claims, and reimbursement procedures.",
    category: "hr",
    type: "PDF",
    size: "650 KB",
    updated: "Jan 2026",
  },
  {
    id: 7,
    title: "Emergency Response Plan",
    description: "Emergency procedures, evacuation plans, and crisis management protocols.",
    category: "safety",
    type: "PDF",
    size: "1.5 MB",
    updated: "Mar 2026",
  },
  {
    id: 8,
    title: "Anti-Bribery & Ethics Policy",
    description: "Code of ethics, anti-corruption guidelines, and compliance requirements.",
    category: "policy",
    type: "PDF",
    size: "720 KB",
    updated: "Feb 2026",
  },
  {
    id: 9,
    title: "Project Execution Standards",
    description: "Standard operating procedures for project execution, documentation, and handover.",
    category: "quality",
    type: "PDF",
    size: "2.8 MB",
    updated: "Apr 2026",
  },
  {
    id: 10,
    title: "Company Organizational Chart",
    description: "Current organizational structure, reporting hierarchy, and department contacts.",
    category: "general",
    type: "PDF",
    size: "450 KB",
    updated: "May 2026",
  },
];

const PORTAL_PASSWORD = "OIAPL2026";

function CategoryIcon({ category }) {
  switch (category) {
    case "policy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "hr":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "safety":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "quality":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      );
  }
}

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication delay
    setTimeout(() => {
      if (password === PORTAL_PASSWORD) {
        onLogin(true);
      } else {
        setError("Invalid access code. Please contact HR if you need assistance.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="portal-page">
      <div className="portal-login-section">
        <div className="portal-login-card">
          <div className="portal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1>Employee Portal</h1>
          <p className="portal-subtitle">
            Access company documents, policies, and resources.
            This area is restricted to authorized employees only.
          </p>

          <form className="portal-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="mini-label" htmlFor="portal-password">
                Access Code
              </label>
              <input
                id="portal-password"
                type="password"
                placeholder="Enter your employee access code"
                className="portal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="portal-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="button primary portal-submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Access Portal"}
            </button>
          </form>

          <div className="portal-login-footer">
            <p>
              If you are an employee and don&apos;t have an access code, please
              contact HR at{" "}
              <a href="mailto:info@intelliactind.com" style={{ color: "var(--accent)" }}>
                info@intelliactind.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  return (
    <div className="portal-dashboard">
      <div className="shell" style={{ padding: "40px 0 80px" }}>
        <div className="portal-header">
          <h1>Employee Portal</h1>
          <button className="portal-logout" onClick={onLogout}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: 16, height: 16, marginRight: 6, verticalAlign: "middle" }}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>

        <div className="portal-welcome">
          <div className="portal-welcome-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h2>Welcome to the Orvion IntelliAct Employee Portal</h2>
            <p>
              Access company policies, safety documents, HR resources, and
              quality standards below.
            </p>
          </div>
        </div>

        <div className="portal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <h2>Company Documents &amp; Policies</h2>
        </div>

        <div className="documents-grid">
          {companyDocuments.map((doc) => (
            <article className="document-card" key={doc.id}>
              <div className={`document-icon ${doc.category}`}>
                <CategoryIcon category={doc.category} />
              </div>
              <div className="document-info">
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <div className="document-meta">
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                  <span>Updated {doc.updated}</span>
                </div>
                <button
                  className="document-download"
                  onClick={() =>
                    alert(
                      `In production, "${doc.title}" would be downloaded from a secure file server. Please contact IT to set up the document storage backend.`
                    )
                  }
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ 
          background: "var(--soft)", 
          border: "1px solid var(--line)", 
          borderRadius: 14, 
          padding: "28px 32px",
          marginTop: 16 
        }}>
          <div className="portal-section-title" style={{ marginBottom: 12 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <h2 style={{ fontSize: "1.1rem" }}>Need a Document Uploaded?</h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7 }}>
            To request a new document to be added to the portal, or to update an
            existing policy, please email{" "}
            <a
              href="mailto:info@intelliactind.com"
              style={{ color: "var(--accent)" }}
            >
              info@intelliactind.com
            </a>{" "}
            with the document and approval details. Only authorized
            administrators can upload or modify documents in this portal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EmployeePortalPage() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check session storage for auth state
  useEffect(() => {
    const isAuth = sessionStorage.getItem("oiapl-portal-auth");
    if (isAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setAuthenticated(true);
      sessionStorage.setItem("oiapl-portal-auth", "true");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("oiapl-portal-auth");
  };

  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
