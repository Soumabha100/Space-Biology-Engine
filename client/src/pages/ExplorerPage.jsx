import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResultsPanel from "../components/ResultsPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [activeEntity, setActiveEntity] = useState(null);

  const handleNodeClick = (node) => {
    setActiveEntity(node);
  };

  return (
    <div className="h-full w-full pt-24">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15}>
          {/* Pass the setActiveEntity function to the results panel */}
          <ResultsPanel onResultClick={setActiveEntity} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />

        <Panel defaultSize={60} minSize={30}>
          {/* Tell the graph which entity to display */}
          <GraphCanvas activeEntity={activeEntity} onNodeClick={handleNodeClick} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />

        <Panel defaultSize={20} minSize={15}>
          {/* The inspector will now show details for the active entity */}
          <InspectorPanel activeEntity={activeEntity} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ExplorerPage;