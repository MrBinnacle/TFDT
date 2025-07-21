const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = 3001;

// Serve static files (if any)
app.use(express.static(path.resolve("public")));

// Helper function to load the decision tree from disk
const loadTree = async () => {
  const file = await fs.readFile(
    path.resolve("data/decision_tree.json"),
    "utf-8"
  );
  return JSON.parse(file);
};

// Endpoint to fetch the root of the decision tree
app.get("/api/decision-tree", async (_req, res) => {
  try {
    const data = await loadTree();
    res.json(data);
  } catch (err) {
    console.error("Error loading decision_tree.json:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch a decision tree node by ID
app.get("/api/decision-tree/:id", async (req, res) => {
  try {
    const data = await loadTree();

    // Helper function to find a node by ID
    const findNodeById = (node, id) => {
      if (node.id === id) return node;
      if (node.children) {
        for (const child of node.children) {
          const result = findNodeById(child, id);
          if (result) return result;
        }
      }
      return null;
    };

    // Fetch the node requested by the client
    const node = findNodeById(data, req.params.id);
    if (node) {
      res.json(node);
    } else {
      res.status(404).json({ error: "Node not found" });
    }
  } catch (err) {
    console.error("Error loading decision_tree.json:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
