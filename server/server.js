const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const PORT = 8000;

// Load the database from db.json
const dbPath = path.join(__dirname, '../client/db.json');
let db = { genes: [], diseases: [], publications: [] };
try {
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
} catch (err) {
  console.error("Error reading db.json:", err);
}

// --- API Endpoints ---

// 1. Search Endpoint (No changes needed here)
app.get('/api/search', (req, res) => {
    const { query } = req.query;
    if (!query) return res.json([]);
    const lowerCaseQuery = query.toLowerCase();
    const genes = db.genes.filter(g => g.name.toLowerCase().includes(lowerCaseQuery)).map(g => ({ ...g, type: 'Gene' }));
    const diseases = db.diseases.filter(d => d.name.toLowerCase().includes(lowerCaseQuery)).map(d => ({ ...d, type: 'Disease' }));
    const publications = db.publications.filter(p => p.title.toLowerCase().includes(lowerCaseQuery)).map(p => ({ ...p, type: 'Publication' }));
    res.json([...genes, ...diseases, ...publications].slice(0, 20));
});

// 2. Graph Data Endpoint (No changes needed here)
app.get('/api/graph/:entityId', (req, res) => {
    const { entityId } = req.params;
    const centralNode = db.genes.find(g => g.name === entityId) || db.diseases.find(d => d.name === entityId);
    if (!centralNode || !centralNode.related_genes) return res.json({ nodes: [], links: [] });
    const nodes = [{ id: centralNode.name, type: centralNode.type || 'Gene', color: '#8b5cf6' }];
    const links = [];
    centralNode.related_genes.forEach(geneName => {
        nodes.push({ id: geneName, type: 'Gene', color: '#3b82f6' });
        links.push({ source: centralNode.name, target: geneName });
    });
    centralNode.related_diseases?.forEach(diseaseName => {
        nodes.push({ id: diseaseName, type: 'Disease', color: '#ef4444' });
        links.push({ source: centralNode.name, target: diseaseName });
    });
    res.json({ nodes, links });
});

// 3. Summary Endpoint (No changes needed here)
app.get('/api/summary/:entityId', (req, res) => {
    const { entityId } = req.params;
    res.json({ generatedSummary: `This is an AI-generated summary for ${entityId}. It highlights its critical role in space biology...` });
});

// 4. NEW: Tags Endpoint
app.get('/api/tags', (req, res) => {
    console.log(`[Server] Received request for tags`);
    const allTags = new Set();
    db.genes.forEach(g => g.tags?.forEach(tag => allTags.add(tag)));
    db.diseases.forEach(d => d.tags?.forEach(tag => allTags.add(tag)));
    res.json(Array.from(allTags));
});

app.listen(PORT, () => {
  console.log(`✅ Mock server is running at http://localhost:${PORT}`);
});