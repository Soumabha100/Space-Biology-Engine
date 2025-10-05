import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { getEntityData } from "../services/api";

const GraphCanvas = ({ activeEntity, onNodeClick }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  // This effect fetches new graph data when the entity changes
  useEffect(() => {
    const fetchData = async () => {
      if (activeEntity?.id) {
        const data = await getEntityData(activeEntity.id);
        if (data?.graph) {
          setGraphData(data.graph);
        } else {
          // If there's no graph data, clear the canvas
          setGraphData({ nodes: [], links: [] });
        }
      } else {
        setGraphData({ nodes: [], links: [] });
      }
    };

    fetchData();
  }, [activeEntity]);

  // This new effect centers the camera on the active node
  useEffect(() => {
    if (activeEntity && fgRef.current) {
      const node = graphData.nodes.find((n) => n.id === activeEntity.id);
      if (node) {
        // Pan and zoom to the selected node
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2, 1000);
      }
    }
  }, [activeEntity, graphData.nodes]);

  return (
    <div className="w-full h-full">
      {graphData.nodes.length > 0 ? (
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="id"
          linkWidth={1}
          linkColor={() => "rgba(107, 114, 128, 0.5)"}
          onNodeClick={onNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 14 / globalScale;
            ctx.font = `600 ${fontSize}px Inter, sans-serif`;
            const nodeSize = 8;

            // Highlight active node
            if (activeEntity && node.id === activeEntity.id) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeSize + 5, 0, 2 * Math.PI, false);
              ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
              ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || "#a3a3a3";
            ctx.fill();
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(label, node.x + nodeSize + 5, node.y);
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-text-dim">
          <p>Search for a topic to visualize the knowledge graph.</p>
        </div>
      )}
    </div>
  );
};

export default GraphCanvas;
