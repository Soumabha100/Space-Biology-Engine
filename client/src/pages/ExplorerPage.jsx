import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResultsPanel from "../components/ResultsPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [activeEntity, setActiveEntity] = useState(null);

  return (
    <div className="h-full w-full pt-24">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={25} minSize={15}>
          <ResultsPanel onResultClick={setActiveEntity} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />
        
        <Panel defaultSize={50} minSize={30}>
          <GraphCanvas activeEntity={activeEntity} onNodeClick={setActiveEntity} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-transparent data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=drag]:bg-primary/50 transition-colors" />

        <Panel defaultSize={25} minSize={15}>
          <InspectorPanel activeEntity={activeEntity} />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ExplorerPage;