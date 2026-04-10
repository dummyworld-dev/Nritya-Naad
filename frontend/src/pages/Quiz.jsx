import { useState } from "react";
import Navbar from "../components/Navbar";

const QUESTIONS = [
  {
    id: 1,
    question: "Which classical dance form originated in Tamil Nadu?",
    options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"],
    answer: "Bharatanatyam",
    category: "Dance",
  },
  {
    id: 2,
    question: "The 'Tandava' dance is associated with which deity?",
    options: ["Vishnu", "Brahma", "Shiva", "Krishna"],
    answer: "Shiva",
    category: "Mythology",
  },
  {
    id: 3,
    question: "Which instrument is Ravi Shankar famous for playing?",
    options: ["Tabla", "Sarod", "Sitar", "Veena"],
    answer: "Sitar",
    category: "Music",
  },
  {
    id: 4,
    question: "Kathak dance has its roots in which region?",
    options: ["Kerala", "Odisha", "North India", "Andhra Pradesh"],
    answer: "North India",
    category: "Dance",
  },
  {
    id: 5,
    question: "How many 'Swaras' (notes) are there in Indian classical music?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    category: "Music",
  },
  {
    id: 6,
    question: "Which dance form is native to Kerala and performed only by men?",
    options: ["Mohiniyattam", "Kathakali", "Manipuri", "Bharatanatyam"],
    answer: "Kathakali",
    category: "Dance",
  },
  {
    id: 7,
    question: "The term 'Raga' in Indian classical music refers to?",
    options: ["A rhythm pattern", "A melodic framework", "A type of instrument", "A dance pose"],
    answer: "A melodic framework",
    category: "Music",
  },
  {
    id: 8,
    question: "Which classical dance form is associated with the temples of Odisha?",
    options: ["Kuchipudi", "Manipuri", "Odissi", "Mohiniyattam"],
    answer: "Odissi",
    category: "Dance",
  },
  {
    id: 9,
    question: "'Abhinaya' in classical dance refers to?",
    options: ["Footwork", "Expression and storytelling", "Costume", "Music rhythm"],
    answer: "Expression and storytelling",
    category: "Dance",
  },
  {
    id: 10,
    question: "The Tabla consists of how many drums?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Music",
  },
];

const CATEGORY_COLORS = {
  Dance: { bg: "rgba(194,24,91,0.12)", border: "rgba(194,24,91,0.35)", text: "#C2185B" },
  Music: { bg: "rgba(0,137,123,0.12)", border: "rgba(0,137,123,0.35)", text: "#00897B" },
  Mythology: { bg: "rgba(57,73,171,0.12)", border: "rgba(57,73,171,0.35)", text: "#3949AB" },
};

const SCORE_MESSAGES = [
  { min: 0,  max: 3,  emoji: "🪔", message: "Keep practicing! Every master was once a beginner." },
  { min: 4,  max: 6,  emoji: "🎵", message: "Good effort! Your knowledge of the arts is growing." },
  { min: 7,  max: 8,  emoji: "🪘", message: "Impressive! You have a strong grasp of Indian classical arts." },
  { min: 9,  max: 10, emoji: "🏆", message: "Exceptional! You are a true connoisseur of Indian classical arts!" },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;
  const scoreMsg = SCORE_MESSAGES.find(s => score >= s.min && score <= s.max);

  function handleSelect(option) {
    if (confirmed) return;
    setSelected(option);
  }

  function handleConfirm() {
    if (!selected) return;
    const correct = selected === question.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { question: question.question, selected, correct, answer: question.answer }]);
    setConfirmed(true);
  }

  function handleNext() {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  }

  function getOptionStyle(option) {
    const base = {
      width: "100%", padding: "14px 20px", borderRadius: "12px",
      fontSize: "15px", cursor: confirmed ? "default" : "pointer",
      textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
      border: "1px solid rgba(255,179,0,0.2)",
      background: "rgba(255,255,255,0.03)", color: "#FFE082",
      display: "flex", alignItems: "center", gap: "12px",
    };

    if (!confirmed) {
      if (selected === option) return {
        ...base,
        background: "rgba(255,107,0,0.15)",
        border: "1px solid rgba(255,107,0,0.6)",
        color: "#FFB300",
      };
      return base;
    }

    if (option === question.answer) return {
      ...base,
      background: "rgba(0,137,123,0.15)",
      border: "1px solid rgba(0,137,123,0.6)",
      color: "#4DB6AC",
    };
    if (option === selected && selected !== question.answer) return {
      ...base,
      background: "rgba(194,24,91,0.15)",
      border: "1px solid rgba(194,24,91,0.5)",
      color: "#E57373",
    };
    return { ...base, opacity: 0.4 };
  }

  function getOptionIcon(option) {
    if (!confirmed) return selected === option ? "◉" : "○";
    if (option === question.answer) return "✓";
    if (option === selected && selected !== question.answer) return "✗";
    return "○";
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{
        flex: 1,
        background: "linear-gradient(180deg, #0D0500 0%, #0A0300 100%)",
        padding: "40px 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {!finished ? (
          <div style={{ width: "100%", maxWidth: "640px" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎭</div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800,
                background: "linear-gradient(90deg, #FFB300, #FF6B00, #FFE082)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "6px",
              }}>Arts & Culture Quiz</h1>
              <p style={{ color: "#5D3A1A", fontSize: "13px" }}>
                Question {current + 1} of {QUESTIONS.length}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{
              height: "4px", borderRadius: "4px",
              background: "rgba(255,179,0,0.12)", marginBottom: "28px", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: "4px",
                background: "linear-gradient(90deg, #FF6B00, #FFB300)",
                width: `${progress}%`, transition: "width 0.4s ease",
              }} />
            </div>

            {/* Score tracker */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: "24px",
            }}>
              <div style={{
                padding: "4px 14px", borderRadius: "20px", fontSize: "12px",
                background: CATEGORY_COLORS[question.category]?.bg,
                border: `1px solid ${CATEGORY_COLORS[question.category]?.border}`,
                color: CATEGORY_COLORS[question.category]?.text,
                fontWeight: 500,
              }}>{question.category}</div>
              <div style={{ color: "#9C7B52", fontSize: "13px" }}>
                Score: <span style={{ color: "#FFB300", fontWeight: 600 }}>{score}</span>
              </div>
            </div>

            {/* Question card */}
            <div style={{
              background: "linear-gradient(135deg, #1A0A00, #200D00)",
              border: "1px solid rgba(255,179,0,0.2)",
              borderRadius: "20px", padding: "28px", marginBottom: "16px",
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(16px, 2.5vw, 20px)", color: "#FFE082",
                lineHeight: 1.6, marginBottom: "24px", fontWeight: 600,
              }}>{question.question}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {question.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    style={getOptionStyle(option)}
                    onMouseEnter={e => {
                      if (!confirmed && selected !== option)
                        e.currentTarget.style.background = "rgba(255,179,0,0.07)";
                    }}
                    onMouseLeave={e => {
                      if (!confirmed && selected !== option)
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <span style={{ fontSize: "14px", minWidth: "16px" }}>{getOptionIcon(option)}</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation after confirm */}
            {confirmed && (
              <div style={{
                padding: "14px 18px", borderRadius: "12px", marginBottom: "16px",
                background: selected === question.answer
                  ? "rgba(0,137,123,0.1)" : "rgba(194,24,91,0.1)",
                border: `1px solid ${selected === question.answer
                  ? "rgba(0,137,123,0.3)" : "rgba(194,24,91,0.3)"}`,
                color: selected === question.answer ? "#4DB6AC" : "#E57373",
                fontSize: "14px", lineHeight: 1.6,
              }}>
                {selected === question.answer
                  ? "✓ Correct! Well done."
                  : `✗ The correct answer is: ${question.answer}`}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {!confirmed ? (
                <button
                  onClick={handleConfirm} disabled={!selected}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "40px",
                    background: selected
                      ? "linear-gradient(135deg, #FF6B00, #C2185B)"
                      : "rgba(255,107,0,0.2)",
                    border: "none", color: selected ? "#fff" : "#5D3A1A",
                    fontSize: "15px", fontWeight: 500,
                    cursor: selected ? "pointer" : "not-allowed",
                    transition: "all 0.2s", fontFamily: "inherit",
                  }}
                >Submit Answer</button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 1, padding: "14px", borderRadius: "40px",
                    background: "linear-gradient(135deg, #FF6B00, #C2185B)",
                    border: "none", color: "#fff",
                    fontSize: "15px", fontWeight: 500,
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: "0 6px 24px rgba(255,107,0,0.3)",
                  }}
                >{current + 1 >= QUESTIONS.length ? "See Results →" : "Next Question →"}</button>
              )}
            </div>
          </div>

        ) : (

          /* Results Screen */
          <div style={{ width: "100%", maxWidth: "640px" }}>
            <div style={{
              background: "linear-gradient(135deg, #1A0A00, #200D00)",
              border: "1px solid rgba(255,179,0,0.25)",
              borderRadius: "24px", padding: "40px 32px",
              textAlign: "center", marginBottom: "24px",
            }}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>{scoreMsg.emoji}</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800,
                background: "linear-gradient(90deg, #FFB300, #FF6B00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "8px",
              }}>Quiz Complete!</h2>
              <p style={{ color: "#9C7B52", fontSize: "14px", marginBottom: "28px" }}>
                {scoreMsg.message}
              </p>

              {/* Score circle */}
              <div style={{
                display: "inline-flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                width: "120px", height: "120px", borderRadius: "50%",
                background: "rgba(255,179,0,0.08)",
                border: "3px solid rgba(255,179,0,0.3)",
                marginBottom: "28px",
              }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "#FFB300" }}>{score}</span>
                <span style={{ fontSize: "13px", color: "#5D3A1A" }}>/ {QUESTIONS.length}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "32px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#4DB6AC" }}>
                    {answers.filter(a => a.correct).length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5D3A1A" }}>Correct</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,179,0,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#E57373" }}>
                    {answers.filter(a => !a.correct).length}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5D3A1A" }}>Incorrect</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,179,0,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#FFB300" }}>
                    {Math.round((score / QUESTIONS.length) * 100)}%
                  </div>
                  <div style={{ fontSize: "12px", color: "#5D3A1A" }}>Score</div>
                </div>
              </div>