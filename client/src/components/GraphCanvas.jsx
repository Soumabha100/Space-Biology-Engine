import React, { useEffect, useState, useRef } from "react";
// CRITICAL: Ensure the import below is exactly { ForceGraph2D }
import { ForceGraph2D } from "react-force-graph";
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
    if (graphData.nodes.length > 0) {
      fgRef.current.zoomToFit(400, 100);
    }
  }, [graphData]);

  return (
    <div className="w-full h-full bg-background">
      {/* CRITICAL: Ensure the component tag below is exactly <ForceGraph2D ... /> */}
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="id"
        nodeAutoColorBy="type"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        onNodeClick={onNodeClick}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.4
          );
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
      />
    </div>
  );
};

export default GraphCanvas;
