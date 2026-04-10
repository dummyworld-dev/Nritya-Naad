const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_PATH = path.join(__dirname, "../data/academies.json");

function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]");
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// GET all academies
router.get("/", (req, res) => {
  const academies = readData();
  res.json(academies);
});

// POST new academy
router.post("/", (req, res) => {
  const { name, location, fees, offerings, contact, description } = req.body;

  if (!name || !location || !fees || !offerings) {
    return res.status(400).json({ error: "Name, location, fees, and offerings are required." });
  }

  const academies = readData();
  const newAcademy = {
    id: Date.now().toString(),
    name: name.trim(),
    location: location.trim(),
    fees: fees.trim(),
    offerings: Array.isArray(offerings)
      ? offerings.map((o) => o.trim()).filter(Boolean)
      : offerings.split(",").map((o) => o.trim()).filter(Boolean),
    contact: contact ? contact.trim() : "",
    description: description ? description.trim() : "",
    createdAt: new Date().toISOString(),
  };

  academies.push(newAcademy);
  writeData(academies);
  res.status(201).json(newAcademy);
});

module.exports = router;