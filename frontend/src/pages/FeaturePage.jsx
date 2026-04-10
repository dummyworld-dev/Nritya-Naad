// src/pages/FeaturePage.jsx
import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import LearnSwarasTool from "../components/LearnSwarasTool";
import BeatVisualizer from "../components/BeatVisualizer";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Mudra" },
  gallery: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Gallery" },
  academy: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Academy" },
  chatbot: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Chat" },
  stories: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Stories" },
  map: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Map" },
  upload: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Upload" },
  danceform: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Dance" },
  quiz: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Quiz" },
  event: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Events" },
  reels: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Reels" },
  mindmap: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Mind Map" },
  pitch: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Pitch" },
  karaoke: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Karaoke" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Visualizer" },
  swaras: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Swaras" },
};

const FEATURE_COMPONENTS = {
  academy: Academy,
};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;
  const isSwaras = id === "swaras";
  const isVisualizer = id === "visualizer";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: "860px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px", flexWrap: "wrap" }}>
          <Link
            to="/features"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              color: "#8B6452",
              transition: "color 0.2s",
            }}
          >
            Back to All Features
          </Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>{feature?.name}</span>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            border: "1.5px solid rgba(0,0,0,0.06)",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: theme.gradient,
              borderRadius: "24px 24px 0 0",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div
              style={{
                minWidth: "68px",
                height: "68px",
                borderRadius: "18px",
                background: theme.bg,
                border: `2px solid ${theme.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: theme.color,
                fontWeight: 700,
                padding: "8px",
                textAlign: "center",
              }}
            >
              {theme.icon}
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: theme.color,
                  marginBottom: "4px",
                }}
              >
                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>NrityaNaad Feature Module</p>
            </div>
          </div>

          <p
            style={{
              fontSize: "15px",
              color: "#5D3A1A",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            This is your dedicated workspace for the{" "}
            <strong style={{ color: theme.color, fontWeight: 500 }}>{feature?.name}</strong> module.
            Build your feature UI and logic here, with full access to the NrityaNaad design system and theme.
          </p>
        </div>

        {isSwaras ? (
          <LearnSwarasTool />
        ) : isVisualizer ? (
          <BeatVisualizer />
        ) : (
          <div
            style={{
              borderRadius: "24px",
              padding: "60px 40px",
              border: `2px dashed ${theme.color}40`,
              background: theme.bg,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>Feature</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 700,
                color: theme.color,
                marginBottom: "10px",
              }}
            >
              Implementation Area
            </h2>
            <p style={{ fontSize: "14px", color: "#8B6452", fontWeight: 300 }}>
              Drop your feature components and logic right here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}