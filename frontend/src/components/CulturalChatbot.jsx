import { useState, useRef, useEffect } from "react";

const WELCOME =
  "Namaste — ask anything about classical dance, music, or culture (typos are OK). When the backend has GROQ_API_KEY in backend/.env and you restart node server.js, replies come from Groq (you’ll see “via Groq” under the answer).";

export default function CulturalChatbot({ theme }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const history = messages.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json().catch(() => ({}));
      let content = data.reply || data.error || "Could not reach the chat service. Is the backend running on port 5000?";
      if (data.source === "groq") {
        content += `\n\n· via Groq${data.model ? ` (${data.model})` : ""}`;
      } else if (data.source === "local" || data.source === "local_fallback") {
        content += "\n\n· curated offline answer (Groq unavailable — check backend terminal & .env)";
      }
      if (data.warning) content += `\n\n— ${data.warning}`;
      setMessages((m) => [...m, { role: "assistant", content }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error — start the backend (`node server.js` in /backend) and use the Vite dev server so /api proxies correctly." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", width: "100%" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: `1.5px solid ${theme.color}28`,
          minHeight: "320px",
          maxHeight: "min(55vh, 420px)",
          overflowY: "auto",
          padding: "18px 16px",
          marginBottom: "14px",
          boxShadow: "0 6px 28px rgba(0,0,0,0.05)",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "14px",
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "88%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user" ? theme.bg : "rgba(0,0,0,0.04)",
                border: msg.role === "user" ? `1px solid ${theme.color}35` : "1px solid rgba(0,0,0,0.06)",
                fontSize: "14px",
                lineHeight: 1.55,
                color: "#2a1810",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: "13px", color: "#8B6452", paddingLeft: "4px" }}>Thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about dance, music, or culture…"
          disabled={loading}
          style={{
            flex: "1 1 200px",
            padding: "12px 14px",
            borderRadius: "14px",
            border: `1.5px solid ${theme.color}35`,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 22px",
            borderRadius: "14px",
            border: "none",
            background: theme.color,
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            opacity: loading || !input.trim() ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
