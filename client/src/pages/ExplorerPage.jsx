import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import SemanticSearchBar from "../components/semanticsearchbar";
import InspectorPanel from "../components/InspectorPanel";
import { getGraphData, getSummary } from "../services/api";

const ExplorerPage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [summary, setSummary] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGraphData();
        const nodes = data.map((n) => ({ id: n.id, label: n.label }));
        const links = data.flatMap((n) =>
          n.connections.map((t) => ({ source: n.id, target: t }))
        );
        setGraphData({ nodes, links });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleNodeClick = async (node) => {
    try {
      const sum = await getSummary(node.id);
      setSummary(sum);
    } catch {
      setSummary("Failed to load summary.");
    }
  };

  const filteredGraph = {
    nodes: graphData.nodes.filter((n) =>
      n.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    links: graphData.links.filter(
      (l) =>
        graphData.nodes.find((n) => n.id === l.source) &&
        graphData.nodes.find((n) => n.id === l.target)
    ),
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-900 text-white min-h-screen">
      <div className="flex-1 md:mr-4">
        <SemanticSearchBar value={searchTerm} onChange={setSearchTerm} />
        <ForceGraph2D
          ref={fgRef}
          graphData={filteredGraph}
          nodeLabel="label"
          nodeAutoColorBy="id"
          onNodeClick={handleNodeClick}
          width={600}
          height={400}
        />
      </div>
      <div className="w-full md:w-1/3 bg-gray-800 p-4 rounded">
        <InspectorPanel summary={summary} />
      </div>
    </div>
  );
};

export default ExplorerPage;