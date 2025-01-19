// Import required modules
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001; // Backend server will run on port 3001

// Enable CORS for cross-origin requests
app.use(cors());

// Serve static files (if needed, e.g., from a public folder)
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to fetch decision tree data
app.get('/api/decision-tree', (req, res) => {
  const decisionTree = require('./decision_tree.json'); // Import decision tree JSON
  res.json(decisionTree); // Send JSON response
});

// Fallback route for 404 errors
app.use((req, res) => {
  res.status(404).send('API endpoint not found');
});
app.get('/api/decision-tree/:id', (req, res) => {
  const nodeId = req.params.id;
  const findNodeById = (tree, id) => {
    if (tree.id === id) return tree;
    if (!tree.children) return null;
    for (const child of tree.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
    return null;
  };
  const node = findNodeById(decisionTree, parseInt(nodeId, 10));
  if (node) {
    res.json(node);
  } else {
    res.status(404).json({ message: 'Node not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
