"use client";

import { useState, useEffect } from "react";
import { PageHero } from "../../components/page-hero";

const PORTAL_USERNAME = "employee";
const PORTAL_PASSWORD = "1234";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication delay
    setTimeout(() => {
      if (username === PORTAL_USERNAME && password === PORTAL_PASSWORD) {
        onLogin(true);
      } else {
        setError("Invalid username or password. Please contact HR if you need assistance.");
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
            <div className="input-group" style={{ marginBottom: "20px" }}>
              <label className="mini-label" htmlFor="portal-username">
                Username
              </label>
              <input
                id="portal-username"
                type="text"
                placeholder="Enter your employee username"
                className="portal-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="input-group" style={{ marginBottom: "24px" }}>
              <label className="mini-label" htmlFor="portal-password">
                Password
              </label>
              <input
                id="portal-password"
                type="password"
                placeholder="Enter your password"
                className="portal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="portal-error" style={{ marginBottom: "20px" }}>
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
              If you are an employee and don&apos;t have login credentials, please
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
  const [activeTab, setActiveTab] = useState("view"); // "view" | "manage"
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("policy");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Fetch documents list from API
  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/documents");
      if (!res.ok) throw new Error("Failed to fetch documents from database");
      const data = await res.json();
      setDocuments(data);
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong while loading files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Handle document deletion
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete document");
      // Refresh list
      fetchDocs();
    } catch (err) {
      alert(err.message || "Failed to delete file.");
    }
  };

  // Handle form submission
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", formTitle);
      formData.append("description", formDescription);
      formData.append("category", formCategory);
      formData.append("file", selectedFile);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to upload document");
      }

      setUploadSuccess(true);
      setFormTitle("");
      setFormDescription("");
      setFormCategory("policy");
      setSelectedFile(null);
      
      // Reset file input element manually
      const fileInput = document.getElementById("portal-file-input");
      if (fileInput) fileInput.value = "";

      // Refresh documents
      fetchDocs();
    } catch (err) {
      setUploadError(err.message || "Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Trigger file download using API route
  const handleDownload = (id, fileName) => {
    window.location.href = `/api/documents/${id}/download`;
  };

  // Filter documents based on search and category
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.file_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="portal-dashboard">
      <div className="shell" style={{ padding: "40px 0 80px" }}>
        {/* Header Block */}
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

        {/* Welcome Section */}
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
              Access company policies, safety documents, HR resources, and quality standards, or upload and manage files.
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="portal-tabs">
          <button
            className={`portal-tab-btn ${activeTab === "view" ? "active" : ""}`}
            onClick={() => setActiveTab("view")}
          >
            Documents Board
          </button>
          <button
            className={`portal-tab-btn ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            Upload & Control Panel
          </button>
        </div>

        {/* Tab 1: View Documents */}
        {activeTab === "view" && (
          <>
            {/* Search and Category Filters */}
            <div className="portal-search-bar">
              <div className="portal-search-input-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search files by title, description..."
                  className="portal-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="portal-category-filters">
                {[
                  { id: "all", name: "All Documents" },
                  { id: "policy", name: "Policies" },
                  { id: "hr", name: "HR" },
                  { id: "safety", name: "Safety" },
                  { id: "quality", name: "Quality" },
                  { id: "general", name: "General" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    className={`portal-filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <h2>
                Company Documents ({filteredDocs.length} {filteredDocs.length === 1 ? "document" : "documents"})
              </h2>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
                <div className="spinner" style={{ marginBottom: 12 }}></div>
                Loading documents from database...
              </div>
            ) : error ? (
              <div className="portal-error" style={{ margin: "20px 0" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            ) : filteredDocs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", background: "var(--soft)", borderRadius: 14, border: "1px solid var(--line)" }}>
                <p style={{ color: "var(--muted)", marginBottom: 0 }}>No documents found matching your filter/search criteria.</p>
              </div>
            ) : (
              <div className="documents-grid">
                {filteredDocs.map((doc) => (
                  <article className="document-card" key={doc.id}>
                    <div className={`document-icon ${doc.category}`}>
                      <CategoryIcon category={doc.category} />
                    </div>
                    <div className="document-info">
                      <h3>{doc.title}</h3>
                      <p>{doc.description}</p>
                      <div className="document-meta">
                        <span>{doc.file_type}</span>
                        <span>{doc.file_size}</span>
                        <span>
                          Updated {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent"}
                        </span>
                      </div>
                      <button
                        className="document-download"
                        onClick={() => handleDownload(doc.id, doc.file_name)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download {doc.file_type}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Tab 2: Upload & Control Panel */}
        {activeTab === "manage" && (
          <div>
            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h2>Upload New Document</h2>
            </div>

            {/* Upload form card */}
            <div className="upload-card">
              {uploadSuccess && (
                <div className="upload-success-toast">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Document uploaded and stored in the database successfully!
                </div>
              )}

              {uploadError && (
                <div className="portal-error" style={{ marginBottom: 20 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleUploadSubmit}>
                <div className="portal-form-row">
                  <div className="portal-form-group">
                    <label htmlFor="doc-title">Document Title *</label>
                    <input
                      id="doc-title"
                      type="text"
                      placeholder="e.g. Employee Code of Conduct"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="portal-form-group">
                    <label htmlFor="doc-category">Category *</label>
                    <select
                      id="doc-category"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      required
                    >
                      <option value="policy">Policy / Guideline</option>
                      <option value="hr">Human Resources (HR)</option>
                      <option value="safety">Health &amp; Safety (HSE)</option>
                      <option value="quality">Quality Standard</option>
                      <option value="general">General / Admin</option>
                    </select>
                  </div>
                </div>

                <div className="portal-form-group">
                  <label htmlFor="doc-desc">Brief Description</label>
                  <textarea
                    id="doc-desc"
                    rows="3"
                    placeholder="Provide a brief summary of what this document contains."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>

                <div className="portal-form-group" style={{ marginBottom: 32 }}>
                  <label>Select Document File (PDF, PNG, JPG, DOCX, XLSX, etc.) *</label>
                  <div className="portal-file-dropzone">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 12 15 15" />
                    </svg>
                    <span>Drag and drop your file here, or click to browse</span>
                    <input
                      id="portal-file-input"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      required
                    />
                    {selectedFile && (
                      <div className="selected-file-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, margin: 0 }}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="button primary"
                  disabled={uploading}
                  style={{ width: "100%", padding: "14px" }}
                >
                  {uploading ? "Uploading Document..." : "Add to Portal Database"}
                </button>
              </form>
            </div>

            {/* Document list manager table */}
            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              <h2>Manage Documents Table</h2>
            </div>

            <div className="manage-table-container">
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                  Loading list...
                </div>
              ) : documents.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                  No files stored in database. Use the form above to add a document.
                </div>
              ) : (
                <table className="manage-table">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Category</th>
                      <th>Filename</th>
                      <th>File size</th>
                      <th>Uploaded At</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: "var(--ink)" }}>{doc.title}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 4 }}>{doc.description || "No description"}</div>
                        </td>
                        <td>
                          <span style={{ textTransform: "capitalize", fontSize: "0.8rem", color: "var(--muted)" }}>{doc.category}</span>
                        </td>
                        <td>
                          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{doc.file_name}</span>
                        </td>
                        <td>{doc.file_size}</td>
                        <td>
                          {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : "Recent"}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(doc.id, doc.title)}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
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
