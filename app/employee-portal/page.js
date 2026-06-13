"use client";

import { useState, useEffect } from "react";
import { PageHero } from "../../components/page-hero";

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
    case "certificate":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h8" />
          <path d="M8 12h5" />
          <path d="M15 15l1 2 2-4" />
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
      const storedUsers = localStorage.getItem("oiapl-portal-users");
      const users = storedUsers ? JSON.parse(storedUsers) : [
        { username: "employee", password: "1234", role: "employee" },
        { username: "admin", password: "5678", role: "admin" }
      ];

      const foundUser = users.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
      );

      if (foundUser) {
        onLogin(foundUser);
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
              . Portal login controls document access only; it is not linked to
              an email inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout, userRole, currentUsername }) {
  const [activeTab, setActiveTab] = useState("view"); // "view" | "manage" | "accounts"
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);

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

  // Accounts management state (Admin only)
  const [accounts, setAccounts] = useState([]);
  const [accUsername, setAccUsername] = useState("");
  const [accPassword, setAccPassword] = useState("");
  const [accRole, setAccRole] = useState("employee");
  const [editingUser, setEditingUser] = useState(null); // null or username of editing user
  const [accError, setAccError] = useState("");
  const [accSuccess, setAccSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState({}); // mapping: username -> boolean

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

  // Load and refresh accounts list from localStorage (Admin only)
  const fetchAccounts = () => {
    const stored = localStorage.getItem("oiapl-portal-users");
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  };

  useEffect(() => {
    fetchDocs();
    if (userRole === "admin") {
      fetchAccounts();
    }
  }, [userRole]);

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
      
      const fileInput = document.getElementById("portal-file-input");
      if (fileInput) fileInput.value = "";

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

  // Handle adding/editing user accounts
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    setAccError("");
    setAccSuccess("");

    if (!accUsername.trim() || !accPassword.trim()) {
      setAccError("Username and password are required.");
      return;
    }

    const cleanUsername = accUsername.trim();
    const stored = localStorage.getItem("oiapl-portal-users");
    let usersList = stored ? JSON.parse(stored) : [];

    if (editingUser) {
      // Editing Mode
      const otherUserExists = usersList.some(
        (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() && u.username.toLowerCase() !== editingUser.toLowerCase()
      );
      if (otherUserExists) {
        setAccError(`Username "${cleanUsername}" is already taken by another account.`);
        return;
      }

      usersList = usersList.map((u) => {
        if (u.username.toLowerCase() === editingUser.toLowerCase()) {
          return { username: cleanUsername, password: accPassword, role: accRole };
        }
        return u;
      });

      setAccSuccess(`Account "${cleanUsername}" updated successfully!`);
      
      // If updating currently logged in administrator, notify them? They can keep active session
      setEditingUser(null);
    } else {
      // Adding Mode
      const userExists = usersList.some(
        (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
      );
      if (userExists) {
        setAccError(`Account with username "${cleanUsername}" already exists.`);
        return;
      }

      usersList.push({ username: cleanUsername, password: accPassword, role: accRole });
      setAccSuccess(`Account "${cleanUsername}" created successfully!`);
    }

    localStorage.setItem("oiapl-portal-users", JSON.stringify(usersList));
    setAccUsername("");
    setAccPassword("");
    setAccRole("employee");
    fetchAccounts();
  };

  const handleEditClick = (user) => {
    setEditingUser(user.username);
    setAccUsername(user.username);
    setAccPassword(user.password);
    setAccRole(user.role);
    setAccError("");
    setAccSuccess("");
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setAccUsername("");
    setAccPassword("");
    setAccRole("employee");
    setAccError("");
    setAccSuccess("");
  };

  const handleAccountDelete = (usernameToDelete) => {
    if (usernameToDelete.toLowerCase() === currentUsername.toLowerCase()) {
      alert("You cannot delete your own admin account while logged in.");
      return;
    }

    if (!confirm(`Are you sure you want to delete the account "${usernameToDelete}"?`)) {
      return;
    }

    const stored = localStorage.getItem("oiapl-portal-users");
    let usersList = stored ? JSON.parse(stored) : [];
    usersList = usersList.filter((u) => u.username.toLowerCase() !== usernameToDelete.toLowerCase());
    
    localStorage.setItem("oiapl-portal-users", JSON.stringify(usersList));
    setAccSuccess(`Account "${usernameToDelete}" deleted successfully.`);
    
    if (editingUser && editingUser.toLowerCase() === usernameToDelete.toLowerCase()) {
      handleCancelEdit();
    }
    
    fetchAccounts();
  };

  const togglePasswordVisibility = (username) => {
    setShowPasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
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
          <div>
            <h1>Employee Portal</h1>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: 4 }}>
              Logged in as <strong style={{ color: "var(--accent)" }}>{currentUsername}</strong> ({userRole === "admin" ? "Administrator" : "Employee"})
            </p>
          </div>
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
              {userRole === "admin"
                ? "Access company policies, safety documents, HR resources, quality standards, or manage portal documents and employee login credentials."
                : "Access company certificates, HR policies, safety documents, quality standards, and company resources."}
            </p>
          </div>
        </div>

        {/* Tabs Bar (Only visible to Admins) */}
        {userRole === "admin" && (
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
            <button
              className={`portal-tab-btn ${activeTab === "accounts" ? "active" : ""}`}
              onClick={() => setActiveTab("accounts")}
            >
              Employee Accounts
            </button>
          </div>
        )}

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
                  { id: "certificate", name: "Certificates" },
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
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                        <button
                          className="document-download"
                          onClick={() => handleDownload(doc.id, doc.file_name)}
                          style={{ marginTop: 0 }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download {doc.file_type}
                        </button>
                        <button
                          className="document-view-btn"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Preview
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Tab 2: Upload & Control Panel (Admin Only) */}
        {activeTab === "manage" && userRole === "admin" && (
          <div>
            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h2>Upload Company Document</h2>
            </div>

            {/* Upload form card */}
            <div className="upload-card">
              {uploadSuccess && (
                <div className="upload-success-toast">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Company document uploaded and stored in the database successfully!
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
                    <label htmlFor="doc-category">Document Category *</label>
                    <select
                      id="doc-category"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      required
                    >
                      <option value="certificate">Company Certificate</option>
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
                  <label htmlFor="portal-file-input">Select Document File (PDF, PNG, JPG, DOCX, XLSX, etc.) *</label>
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
                          <div style={{ display: "inline-flex", gap: 8 }}>
                            <button
                              type="button"
                              className="btn-preview"
                              onClick={() => setPreviewDoc(doc)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "8px 14px",
                                backgroundColor: "rgba(78, 184, 82, 0.08)",
                                border: "1px solid rgba(78, 184, 82, 0.15)",
                                borderRadius: 8,
                                color: "#4EB852",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                              }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              Preview
                            </button>
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Employee Accounts (Admin Only) */}
        {activeTab === "accounts" && userRole === "admin" && (
          <div>
            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h2>{editingUser ? "Edit Employee Account" : "Create Employee Account"}</h2>
            </div>

            {/* Account Creator / Editor Card */}
            <div className="upload-card">
              {accSuccess && (
                <div className="upload-success-toast" style={{ marginBottom: 20 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {accSuccess}
                </div>
              )}

              {accError && (
                <div className="portal-error" style={{ marginBottom: 20 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {accError}
                </div>
              )}

              <form onSubmit={handleAccountSubmit}>
                <div className="portal-form-row">
                  <div className="portal-form-group">
                    <label htmlFor="acc-username">Username *</label>
                    <input
                      id="acc-username"
                      type="text"
                      placeholder="e.g. sachin.samant"
                      value={accUsername}
                      onChange={(e) => setAccUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="portal-form-group">
                    <label htmlFor="acc-password">Password *</label>
                    <input
                      id="acc-password"
                      type="text"
                      placeholder="Enter account password"
                      value={accPassword}
                      onChange={(e) => setAccPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="portal-form-row" style={{ marginTop: 8 }}>
                  <div className="portal-form-group">
                    <label htmlFor="acc-role">Access Role *</label>
                    <select
                      id="acc-role"
                      value={accRole}
                      onChange={(e) => setAccRole(e.target.value)}
                      required
                    >
                      <option value="employee">Employee (Read-Only Portal)</option>
                      <option value="admin">Admin (Full Dashboard Access)</option>
                    </select>
                  </div>
                  <div className="portal-form-group" style={{ justifyContent: "flex-end", marginBottom: 20 }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      {editingUser && (
                        <button
                          type="button"
                          className="button secondary"
                          onClick={handleCancelEdit}
                          style={{ flex: 1, padding: "12px" }}
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="button primary"
                        style={{ flex: 2, padding: "12px" }}
                      >
                        {editingUser ? "Save Changes" : "Create Account"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Registered Accounts List Table */}
            <div className="portal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 22v-1a4 4 0 0 0-3-3.87" />
                <circle cx="16" cy="3.13" r="3" />
              </svg>
              <h2>Manage Employee Accounts ({accounts.length})</h2>
            </div>

            <div className="manage-table-container">
              <table className="manage-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Access Role</th>
                    <th>Password</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((user) => (
                    <tr key={user.username}>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--ink)" }}>{user.username}</div>
                      </td>
                      <td>
                        <span
                          className={`badge-${user.role}`}
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            backgroundColor: user.role === "admin" ? "rgba(0, 169, 227, 0.1)" : "rgba(102, 117, 128, 0.1)",
                            color: user.role === "admin" ? "var(--accent)" : "var(--muted)",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontFamily: "monospace", fontSize: "0.95rem" }}>
                            {showPasswords[user.username] ? user.password : "••••••••"}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user.username)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--muted)",
                              cursor: "pointer",
                              padding: 4,
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                            title={showPasswords[user.username] ? "Hide password" : "Show password"}
                          >
                            {showPasswords[user.username] ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: 8 }}>
                          <button
                            type="button"
                            className="btn-edit"
                            onClick={() => handleEditClick(user)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "6px 12px",
                              backgroundColor: "rgba(0, 169, 227, 0.05)",
                              border: "1px solid rgba(0, 169, 227, 0.15)",
                              borderRadius: 6,
                              color: "var(--accent)",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn-delete"
                            disabled={user.username.toLowerCase() === currentUsername.toLowerCase()}
                            onClick={() => handleAccountDelete(user.username)}
                            style={{
                              opacity: user.username.toLowerCase() === currentUsername.toLowerCase() ? 0.4 : 1,
                              cursor: user.username.toLowerCase() === currentUsername.toLowerCase() ? "not-allowed" : "pointer"
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {previewDoc && (
          <div className="portal-preview-modal-overlay" onClick={() => setPreviewDoc(null)}>
            <div className="portal-preview-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="portal-preview-modal-header">
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>{previewDoc.title}</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "var(--muted)" }}>{previewDoc.file_name} ({previewDoc.file_size})</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <a
                    href={`/api/documents/${previewDoc.id}/download?inline=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      fontSize: "0.82rem",
                      borderRadius: 8,
                      border: "1.5px solid var(--line)"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Full Screen
                  </a>
                  <button
                    className="button primary"
                    onClick={() => handleDownload(previewDoc.id, previewDoc.file_name)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      fontSize: "0.82rem",
                      borderRadius: 8,
                      backgroundColor: "#4EB852",
                      borderColor: "#4EB852"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </button>
                  <button
                    className="portal-preview-close"
                    onClick={() => setPreviewDoc(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--muted)",
                      cursor: "pointer",
                      padding: 4,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="portal-preview-modal-body" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                {["pdf", "png", "jpg", "jpeg", "txt", "svg"].includes(previewDoc.file_type?.toLowerCase() || previewDoc.file_name.split(".").pop()?.toLowerCase()) ? (
                  <iframe
                    src={`/api/documents/${previewDoc.id}/download?inline=true`}
                    title={previewDoc.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 8,
                      flex: 1
                    }}
                  />
                ) : (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 20px",
                    textAlign: "center",
                    color: "var(--muted)",
                    flex: 1
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 64, height: 64, color: "var(--muted)", marginBottom: 16 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 8px" }}>Preview Not Available</h3>
                    <p style={{ fontSize: "0.88rem", maxWidth: 360, margin: "0 0 24px", lineHeight: 1.6 }}>
                      This file format (<strong>.{previewDoc.file_type || previewDoc.file_name.split(".").pop()}</strong>) cannot be previewed directly in the browser.
                    </p>
                    <button
                      className="button primary"
                      onClick={() => handleDownload(previewDoc.id, previewDoc.file_name)}
                      style={{ backgroundColor: "#4EB852", borderColor: "#4EB852", borderRadius: 8, padding: "10px 24px" }}
                    >
                      Download to View
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EmployeePortalPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("employee");
  const [currentUsername, setCurrentUsername] = useState("");

  // Check session storage for auth state and initialize default users
  useEffect(() => {
    // Check and initialize localStorage users if not present
    const storedUsers = localStorage.getItem("oiapl-portal-users");
    if (!storedUsers) {
      const defaultUsers = [
        { username: "employee", password: "1234", role: "employee" },
        { username: "admin", password: "5678", role: "admin" }
      ];
      localStorage.setItem("oiapl-portal-users", JSON.stringify(defaultUsers));
    }

    const isAuth = sessionStorage.getItem("oiapl-portal-auth");
    if (isAuth === "true") {
      setAuthenticated(true);
      setUserRole(sessionStorage.getItem("oiapl-portal-role") || "employee");
      setCurrentUsername(sessionStorage.getItem("oiapl-portal-username") || "");
    }
  }, []);

  const handleLogin = (user) => {
    setAuthenticated(true);
    setUserRole(user.role);
    setCurrentUsername(user.username);
    sessionStorage.setItem("oiapl-portal-auth", "true");
    sessionStorage.setItem("oiapl-portal-role", user.role);
    sessionStorage.setItem("oiapl-portal-username", user.username);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserRole("employee");
    setCurrentUsername("");
    sessionStorage.removeItem("oiapl-portal-auth");
    sessionStorage.removeItem("oiapl-portal-role");
    sessionStorage.removeItem("oiapl-portal-username");
  };

  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      onLogout={handleLogout} 
      userRole={userRole} 
      currentUsername={currentUsername} 
    />
  );
}
