import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";

const GraphCanvas = ({ activeEntity, onNodeClick }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    if (activeEntity) {
      axios
        .get(`http://localhost:8000/api/graph/${activeEntity.id}`)
        .then((response) => {
          setGraphData(response.data);
        })
        .catch((error) => console.error("Error fetching graph data:", error));
    } else {
      setGraphData({ nodes: [], links: [] }); // Clear graph if no entity is selected
    }
  }, [activeEntity]); // Re-run this effect when the activeEntity changes

  useEffect(() => {
    if (graphData.nodes.length > 0 && fgRef.current) {
      fgRef.current.zoomToFit(400, 100);
    }
  }, [graphData]);

  return (
    <div className="w-full h-full bg-background">
      {graphData.nodes.length > 0 ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="id"
          linkWidth={1}
          linkColor={() => "rgba(107, 114, 128, 0.5)"}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleColor={() => "#8b5cf6"}
          onNodeClick={onNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 14 / globalScale;
            ctx.font = `600 ${fontSize}px Inter`;
            const nodeSize = 8;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize + 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = `${node.color}50`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(label, node.x + nodeSize + 5, node.y);
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-text-dim">
          <p>
            Search for a topic and select a result to visualize the knowledge
            graph.
          </p>
        </div>
      )}
    </div>
  );
};

export default GraphCanvas;
