import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Explore" },
    { to: "/academies", label: "Academies" },
    { to: "/quiz", label: "Quiz" },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "linear-gradient(90deg, #1A0A00 0%, #2D1200 50%, #1A0A00 100%)",
      borderBottom: "3px solid #FFB300",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2.5rem",
      height: "68px",
      boxShadow: "0 4px 32px rgba(255,107,0,0.18)",
    }}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "38px", height: "38px",
          background: "linear-gradient(135deg, #FF6B00, #C2185B)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
          boxShadow: "0 0 0 3px rgba(255,179,0,0.35)",
        }}>🪷</div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 700,
          background: "linear-gradient(90deg, #FFB300, #FF6B00, #FFE082)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.5px",
        }}>NrityaNaad</span>
      </Link>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: "none",
            padding: "7px 20px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.4px",
            color: location.pathname === link.to ? "#1A0A00" : "#FFE082",
            background: location.pathname === link.to
              ? "linear-gradient(135deg, #FFB300, #FF6B00)"
              : "transparent",
            border: location.pathname === link.to
              ? "none"
              : "1px solid rgba(255,179,0,0.3)",
            transition: "all 0.25s ease",
          }}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}