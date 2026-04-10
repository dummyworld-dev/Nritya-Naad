const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/stories.json');

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /api/stories - Fetch all stories, optionally filter by tag
router.get('/', (req, res) => {
  const stories = readData();
  const { tag } = req.query;

  if (tag) {
    const filtered = stories.filter(story => 
      story.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(stories);
});

// POST /api/stories - Add a new story
router.post('/', (req, res) => {
  const { content, tags } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const stories = readData();
  
  const newStory = {
    id: Date.now().toString(),
    content,
    tags: tags || [],
    createdAt: new Date().toISOString()
  };

  stories.unshift(newStory); // Add to beginning of array so newest is first
  writeData(stories);

  res.status(201).json(newStory);
});

module.exports = router;
