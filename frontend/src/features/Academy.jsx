import { useState } from "react";

const INITIAL_ACADEMIES = [
  {
    id: 1,
    name: "Kalakshetra Foundation",
    city: "Chennai",
    state: "Tamil Nadu",
    artForms: ["Bharatanatyam", "Carnatic Music"],
    fees: "₹3,000/month",
    offerings: "Beginner to advanced Bharatanatyam, Carnatic vocal & instrumental",
    contact: "+91 44 2491 1169",
    established: 1936,
    icon: "🏛️",
  },
  {
    id: 2,
    name: "Sangeet Natak Akademi",
    city: "New Delhi",
    state: "Delhi",
    artForms: ["Kathak", "Hindustani Music", "Odissi"],
    fees: "₹2,500/month",
    offerings: "Classical dance & music workshops, certificate programs",
    contact: "+91 11 2338 7246",
    established: 1952,
    icon: "🎭",
  },
  {
    id: 3,
    name: "Nrityagram Dance Ensemble",
    city: "Hesaraghatta",
    state: "Karnataka",
    artForms: ["Odissi", "Kuchipudi"],
    fees: "₹5,000/month",
    offerings: "Residential training, intensive workshops, performance tours",
    contact: "+91 80 2846 6313",
    established: 1990,
    icon: "🌿",
  },
  {
    id: 4,
    name: "Gandharva Mahavidyalaya",
    city: "Mumbai",
    state: "Maharashtra",
    artForms: ["Hindustani Music", "Tabla", "Harmonium"],
    fees: "₹1,800/month",
    offerings: "Graded examinations, diploma & degree programs in Hindustani music",
    contact: "+91 22 2363 2805",
    established: 1934,
    icon: "🎵",
  },
  {
    id: 5,
    name: "Kerala Kalamandalam",
    city: "Thrissur",
    state: "Kerala",
    artForms: ["Kathakali", "Mohiniyattam", "Koodiyattam"],
    fees: "₹4,000/month",
    offerings: "Full-time residential courses, deemed university programs",
    contact: "+91 488 2634 305",
    established: 1930,
    icon: "🎨",
  },
];

const theme = {
  color: "#3949AB",
  bg: "rgba(57,73,171,0.08)",
  gradient: "linear-gradient(135deg, #3949AB, #1A237E)",
  border: "rgba(57,73,171,0.2)",
};

const EMPTY_FORM = { name: "", city: "", state: "", artForms: "", fees: "", offerings: "", contact: "" };

export default function Academy() {
  const [academies, setAcademies] = useState(INITIAL_ACADEMIES);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const filtered = academies.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.artForms.some((af) => af.toLowerCase().includes(search.toLowerCase()))
  );

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Academy name is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    if (!form.artForms.trim()) e.artForms = "At least one art form is required";
    if (!form.fees.trim()) e.fees = "Fees are required";
    if (!form.offerings.trim()) e.offerings = "Offerings are required";
    if (!form.contact.trim()) e.contact = "Contact is required";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const newAcademy = {
      id: Date.now(),
      name: form.name.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      artForms: form.artForms.split(",").map((s) => s.trim()).filter(Boolean),
      fees: form.fees.trim(),
      offerings: form.offerings.trim(),
      contact: form.contact.trim(),
      established: new Date().getFullYear(),
      icon: "🏫",
    };
    setAcademies((prev) => [newAcademy, ...prev]);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function handleChange(field, val) {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div>
      {/* Success toast */}
      {submitted && (
        <div style={{
          marginBottom: "16px",
          padding: "14px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(57,73,171,0.12), rgba(57,73,171,0.06))",
          border: `1.5px solid ${theme.color}`,
          color: theme.color,
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          ✅ Academy added successfully and is now visible in the listing!
        </div>
      )}

      {/* Top bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by name, city, or art form..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 220px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: `1.5px solid ${theme.border}`,
            fontSize: "14px",
            color: "#3D1C00",
            outline: "none",
            background: theme.bg,
          }}
        />
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            padding: "10px 22px",
            borderRadius: "10px",
            border: "none",
            background: showForm ? "#e0e0e0" : theme.gradient,
            color: showForm ? "#555" : "#fff",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Academy"}
        </button>
      </div>

      {/* Add Academy Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "28px",
            border: `1.5px solid ${theme.border}`,
            marginBottom: "28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "4px", background: theme.gradient, borderRadius: "20px 20px 0 0",
          }} />

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            fontWeight: 700,
            color: theme.color,
            marginBottom: "20px",
          }}>
            Register Your Academy
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            <Field label="Academy Name *" error={errors.name}>
              <input value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Nritya Kala Mandir" style={inputStyle(errors.name)} />
            </Field>
            <Field label="City *" error={errors.city}>
              <input value={form.city} onChange={(e) => handleChange("city", e.target.value)}
                placeholder="e.g. Pune" style={inputStyle(errors.city)} />
            </Field>
            <Field label="State *" error={errors.state}>
              <input value={form.state} onChange={(e) => handleChange("state", e.target.value)}
                placeholder="e.g. Maharashtra" style={inputStyle(errors.state)} />
            </Field>
            <Field label="Art Forms *" error={errors.artForms}>
              <input value={form.artForms} onChange={(e) => handleChange("artForms", e.target.value)}
                placeholder="Bharatanatyam, Kathak (comma-separated)" style={inputStyle(errors.artForms)} />
            </Field>
            <Field label="Fees *" error={errors.fees}>
              <input value={form.fees} onChange={(e) => handleChange("fees", e.target.value)}
                placeholder="e.g. ₹2,000/month" style={inputStyle(errors.fees)} />
            </Field>
            <Field label="Contact *" error={errors.contact}>
              <input value={form.contact} onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="e.g. +91 98765 43210" style={inputStyle(errors.contact)} />
            </Field>
            <Field label="Offerings *" error={errors.offerings} style={{ gridColumn: "1 / -1" }}>
              <textarea value={form.offerings} onChange={(e) => handleChange("offerings", e.target.value)}
                placeholder="Describe classes, workshops, levels offered..."
                rows={3}
                style={{ ...inputStyle(errors.offerings), resize: "vertical", fontFamily: "inherit" }} />
            </Field>
          </div>

          <button type="submit" style={{
            marginTop: "20px",
            padding: "12px 32px",
            borderRadius: "10px",
            border: "none",
            background: theme.gradient,
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Submit Academy
          </button>
        </form>
      )}

      {/* Count */}
      <p style={{ fontSize: "13px", color: "#8B6452", marginBottom: "16px" }}>
        Showing <strong style={{ color: theme.color }}>{filtered.length}</strong> of {academies.length} academies
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 24px",
          borderRadius: "16px", background: theme.bg, border: `2px dashed ${theme.border}`,
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <p style={{ color: "#8B6452", fontSize: "15px" }}>No academies match your search.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((academy) => <AcademyCard key={academy.id} academy={academy} />)}
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children, style }) {
  return (
    <div style={style}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#5D3A1A", marginBottom: "6px", letterSpacing: "0.3px" }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: "11px", color: "#C2185B", marginTop: "4px" }}>{error}</p>}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: "100%",
    padding: "9px 14px",
    borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#C2185B" : theme.border}`,
    fontSize: "13px",
    color: "#3D1C00",
    outline: "none",
    background: hasError ? "rgba(194,24,91,0.04)" : theme.bg,
    boxSizing: "border-box",
  };
}

function AcademyCard({ academy }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        border: `1.5px solid ${hovered ? theme.color : theme.border}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px ${theme.border}` : "none",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "4px", background: theme.gradient, borderRadius: "20px 20px 0 0",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "12px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "12px",
          background: theme.bg, border: `1.5px solid ${theme.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "22px", flexShrink: 0,
        }}>{academy.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "16px",
            fontWeight: 700, color: theme.color, marginBottom: "3px", lineHeight: 1.3,
          }}>{academy.name}</h3>
          <p style={{ fontSize: "12px", color: "#8B6452" }}>
            📍 {academy.city}, {academy.state} · Est. {academy.established}
          </p>
        </div>
      </div>

      {/* Art form tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
        {academy.artForms.map((af) => (
          <span key={af} style={{
            padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
            fontWeight: 500, color: theme.color, background: theme.bg, border: `1px solid ${theme.border}`,
          }}>{af}</span>
        ))}
      </div>

      {/* Fees & Offerings */}
      <div style={{ marginBottom: "14px" }}>
        <p style={{ fontSize: "13px", color: "#3D1C00", fontWeight: 600, marginBottom: "2px" }}>
          💰 {academy.fees}
        </p>
        <p style={{ fontSize: "12px", color: "#5D3A1A", lineHeight: 1.5, fontWeight: 300 }}>
          {academy.offerings}
        </p>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "10px" }}>
        <a href={`tel:${academy.contact}`} style={{
          fontSize: "12px", color: "#5D3A1A", textDecoration: "none",
        }}>📞 {academy.contact}</a>
      </div>
    </div>
  );
}
