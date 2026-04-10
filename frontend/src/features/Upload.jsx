import { useState, useRef } from "react";

const theme = {
  color: "#3949AB",
  bg: "rgba(57,73,171,0.08)",
  gradient: "linear-gradient(135deg, #3949AB, #1A237E)",
  border: "rgba(57,73,171,0.2)",
};

export default function Upload() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [dragOver, setDragOver] = useState(null); // "image" | "video" | null

  const imageInputRef = useRef();
  const videoInputRef = useRef();

  function handleImageFiles(files) {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;
    const newItems = valid.map((f) => ({ file: f, url: URL.createObjectURL(f), type: "image", name: f.name }));
    setImages((prev) => [...prev, ...newItems]);
    setError("");
  }

  function handleVideoFiles(files) {
    const valid = Array.from(files).filter((f) => f.type.startsWith("video/"));
    if (!valid.length) return;
    const newItems = valid.map((f) => ({ file: f, url: URL.createObjectURL(f), type: "video", name: f.name }));
    setVideos((prev) => [...prev, ...newItems]);
    setError("");
  }

  function removeImage(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function removeVideo(idx) {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit() {
    if (images.length === 0 && videos.length === 0) {
      setError("Please upload at least one image and one video.");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one image of your performance.");
      return;
    }
    if (videos.length === 0) {
      setError("Please upload at least one video of your performance.");
      return;
    }
    setGallery((prev) => [...prev, ...images, ...videos]);
    setImages([]);
    setVideos([]);
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div>
      <p style={{ fontSize: "15px", color: "#5D3A1A", lineHeight: 1.7, marginBottom: "28px", fontWeight: 300 }}>
        Share your dance or music performance with the community. Upload <strong style={{ color: theme.color }}>at least one image</strong> and <strong style={{ color: theme.color }}>one video</strong> to submit.
      </p>

      {/* Success banner */}
      {submitted && (
        <div style={{
          marginBottom: "20px", padding: "14px 20px", borderRadius: "12px",
          background: "rgba(57,73,171,0.08)", border: `1.5px solid ${theme.color}`,
          color: theme.color, fontSize: "14px", fontWeight: 500,
        }}>
          ✅ Performance uploaded successfully! It's now visible in your gallery below.
        </div>
      )}

      {/* Upload zones */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "24px" }}>

        {/* Image upload zone */}
        <DropZone
          label="Images"
          icon="🖼️"
          accept="image/*"
          hint="JPG, PNG, WEBP supported"
          isDragOver={dragOver === "image"}
          onDragOver={() => setDragOver("image")}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => { e.preventDefault(); setDragOver(null); handleImageFiles(e.dataTransfer.files); }}
          onClick={() => imageInputRef.current.click()}
        >
          <input ref={imageInputRef} type="file" accept="image/*" multiple hidden
            onChange={(e) => handleImageFiles(e.target.files)} />
        </DropZone>

        {/* Video upload zone */}
        <DropZone
          label="Videos"
          icon="🎬"
          accept="video/*"
          hint="MP4, MOV, WEBM supported"
          isDragOver={dragOver === "video"}
          onDragOver={() => setDragOver("video")}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => { e.preventDefault(); setDragOver(null); handleVideoFiles(e.dataTransfer.files); }}
          onClick={() => videoInputRef.current.click()}
        >
          <input ref={videoInputRef} type="file" accept="video/*" multiple hidden
            onChange={(e) => handleVideoFiles(e.target.files)} />
        </DropZone>
      </div>

      {/* Previews */}
      {(images.length > 0 || videos.length > 0) && (
        <div style={{
          background: "#fff", borderRadius: "16px",
          border: `1.5px solid ${theme.border}`, padding: "20px", marginBottom: "20px",
        }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#5D3A1A", marginBottom: "14px" }}>
            Selected files — ready to upload
          </p>

          {images.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                Images ({images.length})
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={img.url} alt={img.name}
                      style={{ width: 90, height: 90, objectFit: "cover", borderRadius: "10px", border: `1.5px solid ${theme.border}`, display: "block" }} />
                    <button onClick={() => removeImage(i)} style={{
                      position: "absolute", top: -6, right: -6,
                      width: 20, height: 20, borderRadius: "50%", border: "none",
                      background: "#C2185B", color: "#fff", fontSize: "11px",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                    }}>✕</button>
                    <p style={{ fontSize: "9px", color: "#aaa", marginTop: "4px", maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div>
              <p style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                Videos ({videos.length})
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {videos.map((vid, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <video src={vid.url}
                      style={{ width: 120, height: 90, objectFit: "cover", borderRadius: "10px", border: `1.5px solid ${theme.border}`, display: "block", background: "#000" }} />
                    <button onClick={() => removeVideo(i)} style={{
                      position: "absolute", top: -6, right: -6,
                      width: 20, height: 20, borderRadius: "50%", border: "none",
                      background: "#C2185B", color: "#fff", fontSize: "11px",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                    }}>✕</button>
                    <p style={{ fontSize: "9px", color: "#aaa", marginTop: "4px", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vid.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: "#C2185B", fontSize: "13px", marginBottom: "16px", fontWeight: 500 }}>
          ⚠️ {error}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={images.length === 0 && videos.length === 0}
        style={{
          padding: "13px 36px", borderRadius: "12px", border: "none",
          background: (images.length > 0 || videos.length > 0) ? theme.gradient : "rgba(0,0,0,0.08)",
          color: (images.length > 0 || videos.length > 0) ? "#fff" : "#aaa",
          fontSize: "15px", fontWeight: 600, cursor: (images.length > 0 || videos.length > 0) ? "pointer" : "default",
          transition: "all 0.2s", marginBottom: "40px",
        }}
      >
        Upload Performance
      </button>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(57,73,171,0.2))" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: theme.color }}>
              Performance Gallery
            </h3>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(57,73,171,0.2), transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
            {gallery.map((item, i) => (
              <GalleryItem key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropZone({ label, icon, hint, isDragOver, onDragOver, onDragLeave, onDrop, onClick, children }) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      style={{
        borderRadius: "16px",
        border: `2px dashed ${isDragOver ? theme.color : theme.border}`,
        background: isDragOver ? theme.bg : "#fafafa",
        padding: "36px 24px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: "36px", marginBottom: "10px" }}>{icon}</div>
      <p style={{ fontSize: "15px", fontWeight: 600, color: theme.color, marginBottom: "4px" }}>
        Upload {label}
      </p>
      <p style={{ fontSize: "12px", color: "#8B6452", marginBottom: "4px" }}>
        Drag & drop or click to browse
      </p>
      <p style={{ fontSize: "11px", color: "#bbb" }}>{hint}</p>
      {children}
    </div>
  );
}

function GalleryItem({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px", overflow: "hidden",
        border: `1.5px solid ${hovered ? theme.color : theme.border}`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 28px ${theme.border}` : "none",
        transition: "all 0.2s",
        background: "#000",
      }}
    >
      {item.type === "image" ? (
        <img src={item.url} alt={item.name}
          style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
      ) : (
        <video src={item.url} controls
          style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
      )}
      <div style={{ padding: "8px 10px", background: "#fff" }}>
        <p style={{ fontSize: "11px", color: "#5D3A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.type === "image" ? "🖼️" : "🎬"} {item.name}
        </p>
      </div>
    </div>
  );
}
