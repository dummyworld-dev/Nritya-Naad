import { useMemo, useState } from "react";
import rows from "../data/academies.json";

export default function AcademyListing({ theme }) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  const cities = useMemo(() => {
    const s = new Set(rows.map((r) => r.city));
    return [...s].sort();
  }, []);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (city && r.city !== city) return false;
      if (!t) return true;
      const blob = `${r.name} ${r.city} ${r.state} ${r.focus} ${r.area}`.toLowerCase();
      return blob.includes(t);
    });
  }, [q, city]);

  return (
    <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontSize: "14px", color: "#5D3A1A", lineHeight: 1.65, marginBottom: "20px" }}>
        Sample listings for demo — search or pick a city. Use <strong style={{ color: theme.color }}>Maps</strong> to open directions.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "22px" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, form, area…"
          style={{
            flex: "1 1 200px",
            padding: "11px 14px",
            borderRadius: "12px",
            border: `1.5px solid ${theme.color}35`,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "11px 14px",
            borderRadius: "12px",
            border: `1.5px solid ${theme.color}35`,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            background: "#fff",
            minWidth: "160px",
          }}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {list.map((a) => {
          const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.name} ${a.area} ${a.city}`)}`;
          return (
            <li
              key={a.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "18px 20px",
                border: `1.5px solid ${theme.color}22`,
                boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, color: theme.color, marginBottom: "6px" }}>
                {a.name}
              </div>
              <div style={{ fontSize: "13px", color: "#8B6452", marginBottom: "8px" }}>
                {a.area}, {a.city}, {a.state}
              </div>
              <div style={{ fontSize: "13px", color: "#5D3A1A", marginBottom: "10px" }}>{a.focus}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", fontSize: "13px" }}>
                <a href={`tel:${a.phone.replace(/\s/g, "")}`} style={{ color: theme.color, fontWeight: 500 }}>{a.phone}</a>
                <a href={maps} target="_blank" rel="noreferrer" style={{ color: theme.color, fontWeight: 500 }}>
                  Open in Maps ↗
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && (
        <p style={{ color: "#8B6452", textAlign: "center", padding: "32px" }}>No matches — try another city or search.</p>
      )}
    </div>
  );
}
