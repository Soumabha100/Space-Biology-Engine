import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";

const GraphCanvas = ({ onNodeClick }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/graph/bone-loss")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => console.error("Error fetching graph data:", error));
  }, []);

  useEffect(() => {
    if (graphData.nodes.length > 0 && fgRef.current) {
      fgRef.current.zoomToFit(400, 100);
    }
  }, [graphData]);

  return (
    <div className="w-full h-full bg-background">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="id"
        // Link styling
        linkWidth={1}
        linkColor={() => "rgba(107, 114, 128, 0.5)"}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        // Add link particles for a "data flow" animation
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => "#8b5cf6"}
        onNodeClick={onNodeClick}
        // New Node Drawing Logic
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 14 / globalScale;
          ctx.font = `600 ${fontSize}px Inter`; // Bolder font

          const nodeSize = 8;

          // Draw halo for a glow effect
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize + 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = `${node.color}50`; // Semi-transparent color for halo
          ctx.fill();

          // Draw main node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Draw text
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white"; // White text for better readability
          ctx.fillText(label, node.x + nodeSize + 5, node.y);
        }}
      />
    </div>
  );
};

export default GraphCanvas;
