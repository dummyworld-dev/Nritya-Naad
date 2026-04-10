import { Link } from "react-router-dom";

const CARD_THEMES = {
  mudra:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.2)", icon: "🤲" },
  gallery:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.2)", icon: "🖼️" },
  academy:    { color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.2)", icon: "🏛️" },
  chatbot:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.2)", icon: "💬" },
  stories:    { color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.2)", icon: "📖" },
  map:        { color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.2)", icon: "🗺️" },
  upload:     { color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.2)", icon: "🎬" },
  danceform:       { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.2)", icon: "🎵" },
  quiz:       { color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.2)", icon: "❓" },
  event:      { color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.2)", icon: "📅" },
  reels:      { color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.2)", icon: "🎞️" },
  mindmap:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.2)", icon: "🧠" },
  pitch:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.2)", icon: "🎙️" },
  karaoke:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.2)", icon: "🎤" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.2)", icon: "🌊" },
  swaras:     { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.2)", icon: "🎶" },

};

const CARD_BLURBS = {
  gallery: "Browse classical dance form imagery — eight Sangeet Natak Akademi traditions with notes and credits.",
  academy: "Discover dance & music academies near you — search, filter by city, call or open maps.",
  chatbot: "AI cultural Q&A — add GROQ_API_KEY (free) or OpenAI/Gemini in backend/.env.",
};

export default function FeatureCard({ feature }) {
  const theme = CARD_THEMES[feature.id] || CARD_THEMES.mudra;
  const blurb = CARD_BLURBS[feature.id] || "Explore and experience this module of Indian classical arts";

  return (
    <Link to={`/feature/${feature.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "28px 24px",
          border: `1.5px solid ${theme.border}`,
          cursor: "pointer",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = `0 20px 48px ${theme.border}`;
          e.currentTarget.style.borderColor = theme.color;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = theme.border;
        }}
      >
        {/* Background glow blob */}
        <div style={{
          position: "absolute",
          top: "-30px", right: "-30px",
          width: "100px", height: "100px",
          borderRadius: "50%",
          background: theme.bg,
          filter: "blur(20px)",
          pointerEvents: "none",
        }} />

        {/* Icon */}
        <div style={{
          width: "52px", height: "52px",
          borderRadius: "14px",
          background: theme.bg,
          border: `1.5px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          marginBottom: "16px",
        }}>
          {theme.icon}
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px",
          fontWeight: 700,
          color: theme.color,
          marginBottom: "8px",
        }}>
          {feature.name}
        </h2>

        {/* Desc */}
        <p style={{
          fontSize: "13px",
          color: "#8B6452",
          lineHeight: 1.6,
          marginBottom: "20px",
        }}>
          {blurb}
        </p>

        {/* CTA line */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: 500,
          color: theme.color,
        }}>
          Open module
          <span style={{ fontSize: "16px", transition: "transform 0.2s" }}>→</span>
        </div>
      </div>
    </Link>
  );
}