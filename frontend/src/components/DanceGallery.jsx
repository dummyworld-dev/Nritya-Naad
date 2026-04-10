import { useMemo, useState, useEffect } from "react";
import items from "../data/danceGallery.json";

function imgParams(w) {
  return `?w=${w}&q=82&auto=format&fit=crop`;
}

export default function DanceGallery({ theme }) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((d) => {
      const matchesChip = activeId === "all" || d.id === activeId;
      if (!matchesChip) return false;
      if (!q) return true;
      const blob = `${d.name} ${d.nameHi} ${d.region} ${d.summary} ${d.description}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, activeId]);

  return (
    <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", textAlign: "left" }}>
      <p style={{
        fontSize: "15px",
        color: "#5D3A1A",
        lineHeight: 1.75,
        fontWeight: 300,
        marginBottom: "28px",
      }}>
        Browse the eight classical forms recognised by the Sangeet Natak Akademi — tap a card for the full image and notes. Photos are representative stock imagery; credits link to the original photographers on Unsplash.
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <input
          type="search"
          placeholder="Search by form, region, or keyword…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter gallery by text"
          style={{
            flex: "1 1 220px",
            minWidth: "200px",
            padding: "12px 16px",
            borderRadius: "14px",
            border: `1.5px solid ${theme.color}35`,
            background: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            outline: "none",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        />
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "28px",
      }}>
        <button
          type="button"
          onClick={() => setActiveId("all")}
          style={chipStyle(activeId === "all", theme)}
        >
          All forms
        </button>
        {items.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveId(d.id)}
            style={chipStyle(activeId === d.id, theme)}
          >
            {d.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "#8B6452", fontSize: "15px", textAlign: "center", padding: "48px 16px" }}>
          No dances match that filter. Try clearing search or choosing “All forms”.
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setLightbox(d)}
              style={{
                textAlign: "left",
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 40px ${theme.color}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{
                aspectRatio: "3 / 4",
                background: `linear-gradient(145deg, ${theme.bg}, #fff)`,
                position: "relative",
              }}>
                <img
                  src={`${d.image.split("?")[0]}${imgParams(640)}`}
                  alt={`${d.name} — ${d.region}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 45%, rgba(26,10,0,0.82) 100%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute",
                  left: "16px",
                  right: "16px",
                  bottom: "14px",
                  color: "#fff",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                  }}>
                    {d.name}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    opacity: 0.92,
                    marginTop: "4px",
                    letterSpacing: "0.02em",
                  }}>
                    {d.nameHi} · {d.region}
                  </div>
                </div>
              </div>
              <div style={{
                padding: "14px 16px 18px",
                background: "#fff",
                borderTop: `1px solid ${theme.color}18`,
              }}>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#5D3A1A",
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}>
                  {d.summary}
                </p>
                <span style={{
                  display: "inline-block",
                  marginTop: "10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: theme.color,
                }}>
                  View details →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dance-gallery-lightbox-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(26, 10, 0, 0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setLightbox(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              maxWidth: "min(920px, 100%)",
              maxHeight: "min(90vh, 900px)",
              overflow: "auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
              border: `1.5px solid ${theme.color}25`,
            }}
          >
            <div style={{
              minHeight: "280px",
              background: theme.bg,
              position: "relative",
            }}
            className="dance-gallery-lightbox-img"
            >
              <img
                src={`${lightbox.image.split("?")[0]}${imgParams(1000)}`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ padding: "28px 28px 24px", position: "relative" }}>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.color}30`,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                  lineHeight: 1,
                  color: theme.color,
                }}
              >
                ×
              </button>
              <h2
                id="dance-gallery-lightbox-title"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 4vw, 32px)",
                  color: theme.color,
                  marginBottom: "4px",
                  paddingRight: "40px",
                }}
              >
                {lightbox.name}
              </h2>
              <p style={{ fontSize: "14px", color: "#8B6452", marginBottom: "16px" }}>
                {lightbox.nameHi} · {lightbox.region}
              </p>
              <p style={{
                fontSize: "14px",
                color: "#5D3A1A",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "20px",
              }}>
                {lightbox.description}
              </p>
              <a
                href={lightbox.creditUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "13px",
                  color: theme.color,
                  fontWeight: 500,
                }}
              >
                Photo — {lightbox.credit} (Unsplash) ↗
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .dance-gallery-lightbox-img {
            min-height: 220px !important;
            max-height: 42vh;
          }
        }
        @media (max-width: 720px) {
          [role="dialog"] > div {
            grid-template-columns: 1fr !important;
            max-height: min(92vh, 900px) !important;
          }
        }
      `}</style>
    </div>
  );
}

function chipStyle(active, theme) {
  return {
    padding: "8px 14px",
    borderRadius: "999px",
    border: active ? `1.5px solid ${theme.color}` : `1.5px solid ${theme.color}30`,
    background: active ? theme.bg : "#fff",
    color: active ? theme.color : "#5D3A1A",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s, color 0.2s",
  };
}
