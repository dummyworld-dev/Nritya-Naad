import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// Helper to check if a finger is folded (assuming hand is upright)
const isFingerFolded = (landmarks, tipIdx, pipIdx) => {
  const tip = landmarks[tipIdx];
  const pip = landmarks[pipIdx];
  if (!tip || !pip) return false;
  
  // In MediaPipe, y=0 is top, y=1 is bottom. 
  // If tip is lower than PIP (larger y), it's folded down.
  return tip.y > pip.y;
};

// Helper to check if thumb is folded across the palm
const isThumbFolded = (landmarks) => {
  const tip = landmarks[4];
  const mcp = landmarks[2];
  const pinkyBase = landmarks[17];
  
  if (!tip || !mcp || !pinkyBase) return false;
  
  // If thumb tip is closer to pinky base than the thumb MCP is, it's folded across
  const tipDist = Math.hypot(tip.x - pinkyBase.x, tip.y - pinkyBase.y);
  const mcpDist = Math.hypot(mcp.x - pinkyBase.x, mcp.y - pinkyBase.y);
  return tipDist < mcpDist;
};

// Basic heuristic logic for Bharatanatyam mudras
const identifyMudra = (landmarks) => {
  if (!landmarks || landmarks.length !== 21) return "No Hand Detected";

  // Check state of each finger
  const thumbFolded = isThumbFolded(landmarks);
  const indexFolded = isFingerFolded(landmarks, 8, 6);
  const middleFolded = isFingerFolded(landmarks, 12, 10);
  const ringFolded = isFingerFolded(landmarks, 16, 14);
  const pinkyFolded = isFingerFolded(landmarks, 20, 18);

  // Mudra rules based on finger states (extended vs folded)
  if (!indexFolded && !middleFolded && !ringFolded && !pinkyFolded && !thumbFolded) {
    return "Pataka (Flag)"; // All straight
  }
  if (!thumbFolded && indexFolded && middleFolded && ringFolded && pinkyFolded) {
    return "Shikhara (Peak)"; // Only thumb out
  }
  if (!indexFolded && !middleFolded && ringFolded && !pinkyFolded) {
    return "Tripataka (Three parts)"; // Ring folded, others straight
  }
  if (thumbFolded && indexFolded && middleFolded && ringFolded && pinkyFolded) {
    return "Mushti (Fist)"; // All folded
  }
  if (!indexFolded && middleFolded && ringFolded && pinkyFolded) {
    return "Suchi (Needle)"; // Only index extended
  }
  if (!indexFolded && !middleFolded && ringFolded && pinkyFolded) {
    return "Kartarimukha (Scissors face)"; // Index & middle extended
  }

  return "Try again";
};

export default function MudraDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [mudra, setMudra] = useState("Loading Model...");
  const [isLoaded, setIsLoaded] = useState(false);
  const handLandmarkerRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    let active = true;

    const initModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        
        if (active) {
          setIsLoaded(true);
          setMudra("Waiting for hand...");
          startWebcam();
        }
      } catch (err) {
        console.error("Failed to load MediaPipe Hands:", err);
        if (active) setMudra("Failed to load model");
      }
    };

    initModel();

    return () => {
      active = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      }
    } catch (err) {
      console.error("Webcam error:", err);
      setMudra("Webcam access denied");
    }
  };

  const predictWebcam = () => {
    if (!videoRef.current || !handLandmarkerRef.current) return;
    
    let lastVideoTime = -1;
    
    const renderLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        
        // Pass video directly to HandLandmarker API
        const results = handLandmarkerRef.current.detectForVideo(video, performance.now());
        
        if (results.landmarks && results.landmarks.length > 0) {
          const detected = identifyMudra(results.landmarks[0]);
          setMudra(detected);
          drawLandmarks(results.landmarks[0]);
        } else {
          setMudra("Try again (No hand visible)");
          clearCanvas();
        }
      }
      
      requestRef.current = requestAnimationFrame(renderLoop);
    };
    
    requestRef.current = requestAnimationFrame(renderLoop);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawLandmarks = (landmarks) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw points
    ctx.fillStyle = "#FF6B00";
    ctx.strokeStyle = "#C2185B";
    ctx.lineWidth = 2;
    
    // Connections outline (simplified)
    const connections = [
      [0,1],[1,2],[2,3],[3,4], // Thumb
      [0,5],[5,6],[6,7],[7,8], // Index
      [5,9],[9,10],[10,11],[11,12], // Middle
      [9,13],[13,14],[14,15],[15,16], // Ring
      [13,17],[0,17],[17,18],[18,19],[19,20] // Pinky/base
    ];
    
    ctx.beginPath();
    for (const [startIdx, endIdx] of connections) {
      const a = landmarks[startIdx];
      const b = landmarks[endIdx];
      ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
      ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
    }
    ctx.stroke();

    for (const point of landmarks) {
      ctx.beginPath();
      ctx.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", position: "relative" }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <h3 style={{
          fontSize: "24px", 
          fontFamily: "'Playfair Display', serif", 
          color: "#3949AB",
          margin: "0 0 16px 0"
        }}>
          Detected: <span style={{ color: "#C2185B" }}>{mudra}</span>
        </h3>
        
        <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "12px", background: "#f0f0f0", aspectRatio: "4/3" }}>
          {!isLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#8B6452" }}>
              Initializing Vision Models...
            </div>
          )}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ 
              display: "block", 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              transform: "scaleX(-1)", // Mirror video
              opacity: isLoaded ? 1 : 0
            }} 
          />
          <canvas 
            ref={canvasRef} 
            style={{ 
              position: "absolute", 
              top: 0, left: 0, 
              width: "100%", height: "100%", 
              pointerEvents: "none",
              transform: "scaleX(-1)" // Match video mirror
            }} 
          />
        </div>
      </div>
    </div>
  );
}
