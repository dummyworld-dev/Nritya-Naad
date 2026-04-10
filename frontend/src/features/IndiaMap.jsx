import { useState } from "react";
import indiaMap from "../assets/indiamap.jpg";

// left% and top% are approximate centroids over the indiamap.jpg image
const STATES = [
  { id: "jk",  name: "Jammu & Kashmir",   left: 26, top:  8, dance: "Rouf",                    description: "A graceful folk dance performed by women during festive seasons, especially Eid. Dancers form rows and move in rhythmic patterns to traditional Kashmiri music.", region: "North" },
  { id: "hp",  name: "Himachal Pradesh",   left: 33, top: 17, dance: "Nati",                    description: "Listed in the Guinness World Records as one of the world's largest folk dances. Performed in long rows with swaying hand and body movements to folk tunes.", region: "North" },
  { id: "pb",  name: "Punjab",             left: 22, top: 20, dance: "Bhangra",                 description: "A vibrant harvest folk dance known for its high energy, dhol beats, and exuberant jumps — now a global phenomenon.", region: "North" },
  { id: "uk",  name: "Uttarakhand",        left: 38, top: 19, dance: "Langvir Nritya",          description: "An acrobatic folk dance from Garhwal where performers balance on bamboo poles, showcasing extraordinary balance and strength.", region: "North" },
  { id: "hr",  name: "Haryana",            left: 28, top: 24, dance: "Phag Dance",              description: "A folk dance performed during Holi. Women dance in circles singing Phag songs while men play dholak and other folk instruments.", region: "North" },
  { id: "dl",  name: "Delhi",              left: 31, top: 27, dance: "Kathak",                  description: "Delhi is a major centre for Kathak — the classical dance of North India known for rapid spins, intricate footwork, and expressive storytelling.", region: "North" },
  { id: "rj",  name: "Rajasthan",          left: 19, top: 34, dance: "Ghoomar",                 description: "A traditional Rajput women's dance performed for royalty. Dancers twirl gracefully in flowing ghagras, creating beautiful spiraling patterns.", region: "West" },
  { id: "up",  name: "Uttar Pradesh",      left: 41, top: 30, dance: "Kathak",                  description: "The Lucknow gharana of Kathak flourished under Nawabi patronage, emphasising grace, expressiveness, and subtle abhinaya.", region: "North" },
  { id: "br",  name: "Bihar",              left: 54, top: 32, dance: "Jat-Jatin",               description: "A couple dance depicting the bittersweet relationship between husband and wife. Performed during the monsoon season under moonlight.", region: "East" },
  { id: "jh",  name: "Jharkhand",          left: 54, top: 41, dance: "Chhau",                   description: "A semi-classical martial dance with elaborate masks and warrior movements. Seraikella Chhau is the most prominent style.", region: "East" },
  { id: "wb",  name: "West Bengal",        left: 63, top: 38, dance: "Rabindra Nritya",         description: "A dance form inspired by Rabindranath Tagore's songs and philosophy, blending classical elements with lyrical movement.", region: "East" },
  { id: "as",  name: "Assam",              left: 74, top: 24, dance: "Bihu",                    description: "The vibrant harvest dance of Assam performed during the Bihu festival, characterised by rapid hand movements, hip sways, and energetic footwork.", region: "Northeast" },
  { id: "mn",  name: "Manipur",            left: 80, top: 33, dance: "Manipuri",                description: "One of India's eight classical dance forms, known for its fluid movements and the iconic Ras Lila depicting Krishna's dance with the gopis.", region: "Northeast" },
  { id: "od",  name: "Odisha",             left: 57, top: 48, dance: "Odissi",                  description: "One of India's oldest classical dance forms, known for the tribhangi posture, sculpturesque poses, and devotional themes.", region: "East" },
  { id: "cg",  name: "Chhattisgarh",       left: 46, top: 44, dance: "Panthi",                  description: "A devotional dance of the Satnami community. Dancers move in spiraling circles with increasing speed and energy.", region: "Central" },
  { id: "mp",  name: "Madhya Pradesh",     left: 36, top: 38, dance: "Tertali",                 description: "A unique folk dance where women sit and attach cymbals to their bodies, playing them while balancing pots on their heads.", region: "Central" },
  { id: "gj",  name: "Gujarat",            left: 15, top: 46, dance: "Garba",                   description: "A circular devotional dance performed during Navratri. Dancers clap and move in concentric circles in colourful traditional attire.", region: "West" },
  { id: "mh",  name: "Maharashtra",        left: 31, top: 53, dance: "Lavani",                  description: "A powerful dance-song tradition known for its vigorous rhythm performed to the dholki beat, with bold and assertive themes.", region: "West" },
  { id: "tg",  name: "Telangana",          left: 43, top: 57, dance: "Perini Shivatandavam",    description: "An ancient warrior dance performed before battles to invoke Lord Shiva's blessings. Known as the 'Dance of Warriors.'", region: "South" },
  { id: "ap",  name: "Andhra Pradesh",     left: 49, top: 63, dance: "Kuchipudi",               description: "A classical dance-drama featuring expressive abhinaya and acrobatics, including the tarangam — dancing on a brass plate rim.", region: "South" },
  { id: "ga",  name: "Goa",               left: 26, top: 59, dance: "Fugdi",                   description: "A women's circle dance performed during religious festivals. Dancers form circles and execute rapid, interlocked movements.", region: "West" },
  { id: "ka",  name: "Karnataka",          left: 34, top: 64, dance: "Yakshagana",              description: "A traditional theatre form combining dance, music, and dialogue. Performed overnight in coastal Karnataka depicting stories from Hindu epics.", region: "South" },
  { id: "kl",  name: "Kerala",             left: 33, top: 76, dance: "Kathakali",               description: "A major classical dance-drama renowned for elaborate costumes and vivid face paint. Performers enact stories from Ramayana and Mahabharata.", region: "South" },
  { id: "tn",  name: "Tamil Nadu",         left: 44, top: 74, dance: "Bharatanatyam",           description: "One of India's oldest classical dance forms originating in Tamil Nadu's temples, combining nritta, nritya, and natya.", region: "South" },
];

const REGION_COLORS = {
  North:     "#3949AB",
  Northeast: "#00897B",
  East:      "#C2185B",
  Central:   "#FF6B00",
  West:      "#8E24AA",
  South:     "#E53935",
};

export default function IndiaMap() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      <p style={{ fontSize: "15px", color: "#5D3A1A", lineHeight: 1.7, marginBottom: "20px", fontWeight: 300 }}>
        Click any state on the map to discover its iconic classical or folk dance tradition.
      </p>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        {Object.entries(REGION_COLORS).map(([region, color]) => (
          <span key={region} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5D3A1A", fontWeight: 500 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
            {region}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Map with hotspots */}
        <div style={{ flex: "0 0 auto", position: "relative", display: "inline-block", borderRadius: "16px", overflow: "hidden", border: "1.5px solid rgba(0,137,123,0.2)" }}>
          <img
            src={indiaMap}
            alt="India Map"
            style={{ display: "block", width: "100%", maxWidth: "440px", userSelect: "none" }}
            draggable={false}
          />

          {/* Clickable state hotspots */}
          {STATES.map((state) => {
            const color = REGION_COLORS[state.region];
            const isHovered = hovered?.id === state.id;
            const isSelected = selected?.id === state.id;
            const isActive = isHovered || isSelected;

            return (
              <div
                key={state.id}
                onClick={() => setSelected(isSelected ? null : state)}
                onMouseEnter={() => setHovered(state)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: `${state.left}%`,
                  top: `${state.top}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                {/* Dot */}
                <div style={{
                  width: isActive ? 14 : 10,
                  height: isActive ? 14 : 10,
                  borderRadius: "50%",
                  background: color,
                  border: `2px solid ${isSelected ? "#fff" : "rgba(255,255,255,0.7)"}`,
                  boxShadow: isActive ? `0 0 0 3px ${color}55` : "0 1px 3px rgba(0,0,0,0.3)",
                  transition: "all 0.15s ease",
                }} />

                {/* Tooltip on hover */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    bottom: "calc(100% + 6px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: color,
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "10px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}>
                    {state.name}
                    <div style={{
                      position: "absolute",
                      top: "100%", left: "50%",
                      transform: "translateX(-50%)",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: `4px solid ${color}`,
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Panel */}
        <div style={{ flex: "1 1 240px" }}>
          {selected ? (
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              border: `1.5px solid ${REGION_COLORS[selected.region]}40`,
              overflow: "hidden",
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${REGION_COLORS[selected.region]}, ${REGION_COLORS[selected.region]}bb)`,
                padding: "22px 24px",
                color: "#fff",
              }}>
                <p style={{ fontSize: "11px", opacity: 0.85, marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {selected.region} India
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                  {selected.name}
                </h3>
                <span style={{
                  display: "inline-block", padding: "4px 14px",
                  borderRadius: "20px", background: "rgba(255,255,255,0.2)",
                  fontSize: "13px", fontWeight: 600,
                }}>
                  🎭 {selected.dance}
                </span>
              </div>
              <div style={{ padding: "18px 24px" }}>
                <p style={{ fontSize: "14px", color: "#5D3A1A", lineHeight: 1.75, fontWeight: 300 }}>
                  {selected.description}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: "14px", padding: "6px 16px",
                    borderRadius: "20px", border: `1.5px solid ${REGION_COLORS[selected.region]}40`,
                    background: "transparent", color: REGION_COLORS[selected.region],
                    fontSize: "12px", cursor: "pointer",
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              background: "rgba(0,137,123,0.06)", borderRadius: "20px",
              border: "2px dashed rgba(0,137,123,0.2)", padding: "40px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗺️</div>
              <p style={{ color: "#8B6452", fontSize: "14px", lineHeight: 1.6 }}>
                Click any dot on the map<br />to explore its dance tradition
              </p>
            </div>
          )}

          {/* State pills */}
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>All states</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {STATES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(selected?.id === s.id ? null : s)}
                  style={{
                    padding: "4px 10px", borderRadius: "20px", fontSize: "11px",
                    border: `1.5px solid ${selected?.id === s.id ? REGION_COLORS[s.region] : "rgba(0,0,0,0.1)"}`,
                    background: selected?.id === s.id ? REGION_COLORS[s.region] : "#fff",
                    color: selected?.id === s.id ? "#fff" : "#5D3A1A",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
