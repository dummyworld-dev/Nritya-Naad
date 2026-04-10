const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
const storyRoutes = require("./routes/stories");
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
