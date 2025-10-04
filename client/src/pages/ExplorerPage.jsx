import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import ResultsPanel from "../components/ResultsPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    // The top padding here (pt-24) makes space for the GlobalHeader
    <div className="h-full w-full pt-24">
      <PanelGroup direction="horizontal">
        {/* Left Panel: Results */}
        <Panel defaultSize={20} minSize={15}>
          <ResultsPanel />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />

        {/* Center Panel: Graph */}
        <Panel defaultSize={60} minSize={30}>
          <GraphCanvas onNodeClick={handleNodeClick} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />

        {/* Right Panel: Inspector */}
        <Panel defaultSize={20} minSize={15}>
          <InspectorPanel selectedNode={selectedNode} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ExplorerPage;
