require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
const storyRoutes = require("./routes/stories");
const chatRoutes = require("./routes/chat");
app.use("/api/stories", storyRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  if (process.env.GROQ_API_KEY?.trim()) console.log("Groq: GROQ_API_KEY loaded — /api/chat uses LLM");
  else console.log("Groq: no GROQ_API_KEY — /api/chat uses local knowledge only");
});
