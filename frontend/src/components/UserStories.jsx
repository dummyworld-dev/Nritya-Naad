import { useState, useEffect } from "react";

export default function UserStories({ theme }) {
  const [stories, setStories] = useState([]);
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStories = async (tag = "") => {
    try {
      setLoading(true);
      const url = tag ? `/api/stories?tag=${encodeURIComponent(tag)}` : "/api/stories";
      const res = await fetch(url);
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(filterTag);
  }, [filterTag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Process tags: split by comma, trim spaces, remove empty
    const tagsArray = tagsInput
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, tags: tagsArray }),
      });

      if (res.ok) {
        setContent("");
        setTagsInput("");
        // Reload stories without filter to show the new one
        setFilterTag("");
        fetchStories("");
      }
    } catch (error) {
      console.error("Failed to post story:", error);
    }
  };

  // Derive unique tags from current stories (if no filter)
  // For a hackathon, deriving tags from ALL fetched stories is simple + effective
  const allUniqueTags = Array.from(
    new Set(stories.flatMap(story => story.tags))
  ).sort();

  return (
    <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto", width: "100%" }}>
      {/* ADD STORY FORM */}
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: `1.5px solid ${theme.color}30`,
        marginBottom: "32px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
      }}>
        <h3 style={{ 
          fontFamily: "'Playfair Display', serif", 
          color: theme.color, 
          marginTop: 0,
          marginBottom: "16px",
          fontSize: "20px"
        }}>
          Share Your Story
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your dance or music story?"
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              resize: "vertical",
              marginBottom: "12px",
              boxSizing: "border-box"
            }}
            required
          />
          <input 
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Tags (comma separated, e.g., Bharatanatyam, Event, Learning)"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              marginBottom: "16px",
              boxSizing: "border-box"
            }}
          />
          <button 
            type="submit"
            style={{
              background: theme.gradient,
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
          >
            Post Story
          </button>
        </form>
      </div>

      {/* FILTER UI */}
      {allUniqueTags.length > 0 && !filterTag && (
        <div style={{ marginBottom: "24px" }}>
          <span style={{ fontSize: "14px", color: "#8B6452", marginRight: "12px", fontWeight: 600 }}>Filter:</span>
          {allUniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              style={{
                background: theme.bg,
                color: theme.color,
                border: `1px solid ${theme.color}40`,
                padding: "6px 14px",
                borderRadius: "20px",
                marginRight: "8px",
                marginBottom: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {filterTag && (
        <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", color: "#8B6452" }}>Showing stories for:</span>
          <span style={{
            background: theme.color,
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "16px",
            fontSize: "13px",
            fontWeight: 500
          }}>
            #{filterTag}
          </span>
          <button 
            onClick={() => setFilterTag("")}
            style={{
              background: "transparent",
              border: "none",
              color: "#880E4F",
              cursor: "pointer",
              fontSize: "13px",
              textDecoration: "underline"
            }}
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* STORIES FEED */}
      <div>
        {loading ? (
          <p style={{ color: "#8B6452", textAlign: "center" }}>Loading stories...</p>
        ) : stories.length === 0 ? (
          <p style={{ color: "#8B6452", textAlign: "center", fontStyle: "italic" }}>
            No stories yet. Be the first to share!
          </p>
        ) : (
          stories.map(story => (
            <div key={story.id} style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.04)"
            }}>
              <p style={{ 
                margin: "0 0 16px 0", 
                fontSize: "16px", 
                color: "#4A2C1D",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap"
              }}>
                {story.content}
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {story.tags.map(tag => (
                  <span key={tag} style={{
                    background: "rgba(0,0,0,0.04)",
                    color: "#5D3A1A",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: "12px", color: "#A88D80" }}>
                {new Date(story.createdAt).toLocaleString(undefined, { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
