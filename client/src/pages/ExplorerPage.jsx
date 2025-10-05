import React, { useState } from "react";
import { motion } from "framer-motion";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

import ResultsPanel from "../components/ResultsPanel";
import GraphCanvas from "../components/GraphCanvas";
import InspectorPanel from "../components/InspectorPanel";

const ExplorerPage = () => {
  const [activeEntity, setActiveEntity] = useState(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  return (
    // Main container takes up the full space
    <div className="h-full w-full relative pt-20 overflow-hidden">
      {/* 1. Graph Canvas is now the background layer */}
      <div className="absolute inset-0">
        <GraphCanvas
          activeEntity={activeEntity}
          onNodeClick={setActiveEntity}
        />
      </div>

      {/* 2. Global Header is positioned on top */}
      {/* Note: We'll adjust GlobalHeader in the next step, for now it's fine */}

      {/* 3. ResultsPanel becomes a draggable, floating panel */}
      <motion.div
        drag
        dragMomentum={false} // Makes it stop right when you let go
        className="absolute top-24 left-4 w-full max-w-md"
      >
        <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-border shadow-2xl overflow-hidden">
          <ResultsPanel onResultClick={setActiveEntity} />
        </div>
      </motion.div>

      {/* 4. Inspector Panel is on the right, and collapsible */}
      <AnimatePresence>
        {isInspectorOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-0 right-0 h-full w-full max-w-sm"
          >
            <InspectorPanel activeEntity={activeEntity} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Button to toggle the Inspector Panel */}
      <button
        onClick={() => setIsInspectorOpen(!isInspectorOpen)}
        className="absolute top-24 right-4 bg-surface/80 hover:bg-surface backdrop-blur-sm p-2 rounded-lg border border-border shadow-lg transition-colors"
        title={isInspectorOpen ? "Close Inspector" : "Open Inspector"}
      >
        {isInspectorOpen ? <PanelRightClose /> : <PanelRightOpen />}
      </button>
    </div>
  );
};

// We need to import AnimatePresence if it's not already
import { AnimatePresence } from "framer-motion";

export default ExplorerPage;
