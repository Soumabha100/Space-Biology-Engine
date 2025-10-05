const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8000;

// --- Expanded Mock Data ---
const MOCK_SEARCH_RESULTS = [
  {
    id: "Bone Loss",
    type: "Disease",
    description:
      "Reduction in the quantity of bone or atrophy of skeletal tissue.",
    tags: ["Musculoskeletal", "Microgravity Effect"],
  },
  {
    id: "Microgravity",
    type: "Space Stressor",
    description:
      "The condition of experiencing little or no gravitational force.",
    tags: ["Environment", "Fundamental Factor"],
  },
  {
    id: "Cosmic Radiation",
    type: "Space Stressor",
    description:
      "High-energy particles that originate from outside the Earth's solar system.",
    tags: ["Environment", "Radiation"],
  },
  {
    id: "Osteoclasts",
    type: "Biological Process",
    description: "Cells responsible for the breakdown of bone tissue.",
    tags: ["Cellular Biology", "Bone Remodeling"],
  },
];

const MOCK_GRAPH_DATA = {
  "bone-loss": {
    nodes: [
      { id: "Microgravity", type: "Space Stressor", color: "#ef4444" },
      { id: "Bone Loss", type: "Disease", color: "#3b82f6" },
      { id: "Osteoclasts", type: "Biological Process", color: "#f97316" },
      { id: "Cosmic Radiation", type: "Space Stressor", color: "#ef4444" },
    ],
    links: [
      { source: "Microgravity", target: "Bone Loss", label: "CAUSES" },
      { source: "Microgravity", target: "Osteoclasts", label: "ACTIVATES" },
      { source: "Osteoclasts", target: "Bone Loss", label: "CONTRIBUTES TO" },
      { source: "Cosmic Radiation", target: "Bone Loss", label: "EXACERBATES" },
    ],
  },
};

const MOCK_SUMMARY = {
  "bone-loss": {
    entityName: "Bone Loss",
    generatedSummary:
      "Based on multiple studies, microgravity is a primary driver of bone density loss in astronauts. It activates osteoclasts, the cells responsible for bone breakdown. This effect is a critical concern for long-duration missions to the Moon and Mars.",
  },
};

// --- API Endpoints ---

// 1. Search Endpoint
app.get("/api/search", (req, res) => {
  const { query } = req.query;
  console.log(`[Mock Server] Received search for: ${query}`);
  if (!query) {
    return res.json([]);
  }
  const filteredResults = MOCK_SEARCH_RESULTS.filter((item) =>
    item.id.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredResults);
});

// 2. Graph Data Endpoint
app.get("/api/graph/:entityId", (req, res) => {
  console.log(
    `[Mock Server] Received request for graph data for: ${req.params.entityId}`
  );
  const entityKey = req.params.entityId.toLowerCase().replace(" ", "-");
  res.json(MOCK_GRAPH_DATA[entityKey] || { nodes: [], links: [] });
});

// 3. Summary Endpoint
app.get("/api/summary/:entityId", (req, res) => {
  console.log(
    `[Mock Server] Received request for summary for: ${req.params.entityId}`
  );
  const entityKey = req.params.entityId.toLowerCase().replace(" ", "-");
  res.json(MOCK_SUMMARY[entityKey] || {});
});

app.listen(PORT, () => {
  console.log(`✅ Mock server is running at http://localhost:${PORT}`);
});
