import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import SearchPanel from "../components/SearchPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    // This function will be passed to the graph to update the selected node
    setSelectedNode(node);
  };

  return (
    <div className="h-full w-full">
      <PanelGroup direction="horizontal">
        {/* Left Panel: Search */}
        <Panel defaultSize={20} minSize={15}>
          <SearchPanel />
        </Panel>
        <PanelResizeHandle className="w-2 bg-background hover:bg-primary/20 transition-colors" />

        {/* Center Panel: Graph */}
        <Panel defaultSize={60} minSize={30}>
          <GraphCanvas onNodeClick={handleNodeClick} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-background hover:bg-primary/20 transition-colors" />

        {/* Right Panel: Inspector */}
        <Panel defaultSize={20} minSize={15}>
          <InspectorPanel selectedNode={selectedNode} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ExplorerPage;
