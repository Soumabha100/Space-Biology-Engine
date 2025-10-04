const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 8000;

const MOCK_GRAPH_DATA = {
    nodes: [
        { id: "Microgravity", type: "SpaceStressor", color: "#ff6384" },
        { id: "Bone Loss", type: "Disease", color: "#36a2eb" },
        { id: "Osteoclasts", type: "BiologicalProcess", color: "#ffce56" },
        { id: "Cosmic Radiation", type: "SpaceStressor", color: "#ff6384" },
    ],
    links: [
        { source: "Microgravity", target: "Bone Loss", label: "CAUSES" },
        { source: "Microgravity", target: "Osteoclasts", label: "ACTIVATES" },
        { source: "Osteoclasts", target: "Bone Loss", label: "CONTRIBUTES TO" },
        { source: "Cosmic Radiation", target: "Bone Loss", label: "EXACERBATES" },
    ],
};

const MOCK_SUMMARY = {
    entityName: "Bone Loss",
    generatedSummary: "Based on multiple studies, microgravity is a primary driver of bone density loss in astronauts. It activates osteoclasts, the cells responsible for bone breakdown. This effect is a critical concern for long-duration missions to the Moon and Mars."
};



// 1. Graph Data Endpoint
app.get('/api/graph/:entityId', (req, res) => {
  console.log(`[Mock Server] Received request for graph data for: ${req.params.entityId}`);
  res.json(MOCK_GRAPH_DATA);
});

// 2. Summary Endpoint
app.get('/api/summary/:entityId', (req, res) => {
  console.log(`[Mock Server] Received request for summary for: ${req.params.entityId}`);
  res.json(MOCK_SUMMARY);
});

app.listen(PORT, () => {
  console.log(`✅ Mock server is running at http://localhost:${PORT}`);
});